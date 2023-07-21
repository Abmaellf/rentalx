import { ICreateUserTokenDTO } from "../dto/ICreateUserTokenDTO"
import { UserTokens } from "../infra/typeorm/entities/UserTokens"

  interface IUsersTokensRepository {
    create({
      expires_date,
      refresh_token,
      user_id
    }: ICreateUserTokenDTO): Promise<void>;
  }
  export { IUsersTokensRepository}