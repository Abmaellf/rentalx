import { ICreateUserTokenDTO } from "@modules/accounts/dto/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";
import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm/dataSource";
import { AppError } from "@shared/errors/AppError";

class UsersTokensRepository implements IUsersTokensRepository {

  private repository: Repository<UserTokens>

  constructor() {
      this.repository = dataSource.getRepository(UserTokens) 
  }
  
  async create({
     expires_date,
     refresh_token, 
     user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
      const userToken =  this.repository.create({
        expires_date,
        refresh_token, 
        user_id
      })

      await this.repository.save(userToken);
      return userToken;

  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const users_tokens = await this.repository.findOneBy({
      user_id,
      refresh_token,

    });

    if(!users_tokens){
      throw new AppError("users_tokens already not exists");
    }

    return users_tokens;
    
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {

    const userToken = await this.repository.findOneBy({ refresh_token})

    
    if(!userToken){
      throw new AppError("users_tokens already not exists");
    }
    return userToken;
  }
}
export { UsersTokensRepository };