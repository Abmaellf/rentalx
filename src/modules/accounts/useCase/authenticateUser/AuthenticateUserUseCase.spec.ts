/* eslint-disable prettier/prettier */
import { ICreateUserDTO } from "@modules/accounts/dto/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/provider/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  
  beforeEach(()=>{
    usersRepositoryInMemory =  new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
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
