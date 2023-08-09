import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dto/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { dataSource } from "@shared/infra/typeorm/dataSource";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {

  private repository: Repository<User>;
  
  constructor(){
    this.repository = dataSource.getRepository(User);
  }
    
    async create({name,  email, driver_license, password, avatar, id}: ICreateUserDTO):Promise<void> {
        const user = this.repository.create({
          name, 
          email,
          password, 
          driver_license, 
          avatar,
          id
          
        });
        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({email});
        return user;
    }

    async findById(id: string): Promise<User> {
        //findOneBy é identico ao do doctrine(sf PHP)
        const user = await this.repository.findOneBy({id});
        return user;
    }

} export{ UsersRepository};

