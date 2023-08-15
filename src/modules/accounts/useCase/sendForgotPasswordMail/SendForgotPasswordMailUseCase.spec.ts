import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { DayjsDateProvider } from "@shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/provider/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail ", () =>{
  beforeAll(()=>{
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new  DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    ); 

  })

  it("Should be able  to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license:"348916",
      email:"fudni@dasfik.ls",
      name:"Olivia Leonard",
      password:"1234",
    });

    await sendForgotPasswordMailUseCase.execute("fudni@dasfik.ls");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exits", async () =>{
    await expect(
      sendForgotPasswordMailUseCase.execute("zilajbi@is.pt")
    ).rejects.toEqual(new AppError("Users does not exists! "));

  });

  it("Should be able to create an usersToken", async ()=>{
      const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create")

       usersRepositoryInMemory.create({
        driver_license:"207695",
        email:"zu@waum.ck",
        name:"Lucile Dean",
        password:"1234",
      });

      await sendForgotPasswordMailUseCase.execute("zu@waum.ck");

      expect(generateTokenMail).toBeCalled();

  });
});