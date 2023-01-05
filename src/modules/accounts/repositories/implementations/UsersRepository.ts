/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Repository } from "typeorm";

import dataSource from "../../../../database/dataSource";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {

  private repository: Repository<User>;
  
  constructor(){
    this.repository = dataSource.getRepository(User);
  }
    
    async create({name,  email, driver_license, password}: ICreateUserDTO):Promise<void> {
        const user = this.repository.create({
          name, 
          email,
          password, 
          driver_license, 
          
        });
        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({email});
        return user;
    }

} export{ UsersRepository};

