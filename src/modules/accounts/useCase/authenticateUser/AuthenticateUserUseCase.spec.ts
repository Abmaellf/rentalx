/* eslint-disable prettier/prettier */
import { AppError } from "@errors/AppError";

import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
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

  it("should not be able to authenticate an nonexistent user ",  ()=>{
    expect(async ()=>{
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
  
      });
    }).rejects.toBeInstanceOf(AppError)
  });


  it("should not be able  to authenticate with incorret password", ()=>{
    expect(async ()=>{
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "user@user.com",
        password:"1234",
        name: "User Test Eroor"
      }

      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorretPassword",
      });
    }).rejects.toBeInstanceOf(AppError)
  })
});
