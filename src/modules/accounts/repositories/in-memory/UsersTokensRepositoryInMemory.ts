import { ICreateUserTokenDTO } from "@modules/accounts/dto/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

  class UsersTokensRepositoryInMemory implements IUsersTokensRepository {

    usersTokens: UserTokens[] = [];

    async create({ 
            expires_date, 
            refresh_token, 
            user_id 
          }: ICreateUserTokenDTO): Promise<UserTokens> {
      
          const userToken = new UserTokens();

          Object.assign(userToken,{
           expires_date,
            refresh_token,
            user_id
          });

        this.usersTokens.push(userToken);
      
      return userToken;

    }

    async findByUserIdAndRefreshToken(
      user_id: string, 
      refresh_token: string
      ): Promise<UserTokens> {

      const userToken = this.usersTokens.find(
        ut => ut.user_id === user_id && ut.refresh_token === refresh_token );

        
    if(!userToken){
      throw new AppError("users_tokens already not exists");
    }

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
          const userToken =  this.usersTokens.find((ut)=> ut.id === id);

          
      if(!userToken){
        throw new AppError("users_tokens already not exists");
      }

        this.usersTokens.splice(this.usersTokens.indexOf(userToken)
        );

    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
      const userToken =  this.usersTokens.find((ut) => ut.refresh_token === refresh_token);

      
    if(!userToken){
      throw new AppError("users_tokens already not exists");
    }
      return userToken;
    }

  }
  export { UsersTokensRepositoryInMemory };