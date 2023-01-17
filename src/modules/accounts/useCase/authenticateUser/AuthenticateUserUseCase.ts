/* eslint-disable prettier/prettier */
import { compare } from "bcrypt";
import {sign} from "jsonwebtoken"
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";


/* eslint-disable prettier/prettier */ 
interface IRequest {
    email: string;
    password: string;
}

interface IResponse{
  user:{
      email: string
      password: string;

  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ){}

  async execute({email, password}: IRequest): Promise<IResponse> {
      // Usuario existe
      const user = await this.userRepository.findByEmail(email);

      if(!user){
        throw new AppError("Email or password incorrect")
      }
      
      // Senha esta correta
      const passwordMath = await compare(password, user.password);
      if(!passwordMath){
        throw new AppError("Email or password incorrect")
      }

      const token = sign({}, "4d2c777dbe7fea69180384096575743b",{
        subject: user.id,
        expiresIn: "1d"
      });

      return {
        user,
        token
      }
      // Gerar jsonwebtoken

      
    }
}
export { AuthenticateUserUseCase };
