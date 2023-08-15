import auth from "@config/auth"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { verify, sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider : IDateProvider
  ) {}

    async execute(token: string): Promise<string> {
     const {email, sub} =  verify(token, auth.secret_refresh_token) as IPayload;

     const user_id = sub;
     
     const user_token = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);
     if(!user_token){
      throw new Error("Refresh token does not exists! ");
     }
     await this.usersTokensRepository.deleteById(user_token.id);
     
      const refresh_token = sign({ email }, auth.secret_refresh_token,{
        subject: sub,
        expiresIn: auth.expires_in_refresh_token
      });

      const expires_date = this.dateProvider.addDays(
        auth.expires_refresh_token_days
      );

      //Obs esse create retorna, um userToken, pois eu ajustei na Interface e na implementação
      //mas aqui não tem variavél recebendo
      await this.usersTokensRepository.create({
        expires_date,
        refresh_token,
        user_id
      })

      return refresh_token;
    }
}
export { RefreshTokenUseCase}