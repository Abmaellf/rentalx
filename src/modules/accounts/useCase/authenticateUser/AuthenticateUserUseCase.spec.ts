/* eslint-disable prettier/prettier */
import { ICreateUserDTO } from "@modules/accounts/dto/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  
  beforeEach(()=>{
    usersRepositoryInMemory =  new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })


  it("should be able to authenticate a user ", async ()=>{
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password:"1234",
      name:"usertest"
    };
    await createUserUseCase.execute(user);
    const result  = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,

    });

   expect(result).toHaveProperty("token")

  })

  it("should not be able to authenticate an nonexistent user ",  async ()=>{
    await expect( authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
  
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  });


  it("should not be able  to authenticate with incorret password",async  ()=>{
   
    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "user@user.com",
      password:"1234",
      name: "User Test Error"
    };
    await createUserUseCase.execute(user);
   
   await expect(

        authenticateUserUseCase.execute({
        email: user.email,
        password: "incorretPassword",
      })

    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
});
