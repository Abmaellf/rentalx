import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";

@injectable()
  class SendForgotPasswordMailUseCase {
    constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
      @inject("UsersTokensRepository")
      private usersTokensRepository: IUsersTokensRepository,
      @inject("DayJsDateProvider")
      private dateProvider: IDateProvider
    ){} 

    async execute(email: string){
      const user = await this.usersRepository.findByEmail(email);

      if(!user){
        throw new AppError("Users does not exists! ")
      }

      const token = uuidV4();
      const expires_date = this.dateProvider.addHours(3);

      await this.usersTokensRepository.create({
        refresh_token: token,
        user_id: user.id,
        expires_date
      })
    }

  }
  export { SendForgotPasswordMailUseCase };