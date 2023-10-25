/* eslint-disable prettier/prettier */
/* eslint-disable import-helpers/order-imports */
/* eslint-disable prettier/prettier */
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";

import { User } from "../../infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository {

  users: User[] = [];

    async create({ driver_license, email, name, password}: ICreateUserDTO): Promise<void> {
      const user = new User();
      Object.assign(user, {
        driver_license, email, name, password
      });
       this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {

      const user = this.users.find((user)=> user.email === email);
      
    if(!user){
      throw new AppError("users_tokens already not exists");
    }
      return user;

    }

    async findById(id: string): Promise<User> {

       const user = this.users.find((user)=> user.id === id);

      
    if(!user){
      throw new AppError("users already not exists");
    }
      return user;
    }

}

export { UsersRepositoryInMemory };
