import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({ token, password}): Promise<void> {
      const userToken =  await this.usersTokensRepository.findByRefreshToken(
        token
      );

      if(!userToken){
         throw  new AppError("Token invalid! ");
      }

      const expires_date = userToken.expires_date;

      const dateNow = this.dateProvider.dateNow();

      if(this.dateProvider.compareIfBefore( 
        expires_date, 
        dateNow )) {
            throw new AppError("Token expires! ");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
  }
}
export { ResetPasswordUserUseCase }