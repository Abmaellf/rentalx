import { ResetPasswordUserController } from "@modules/accounts/useCase/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCase/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRouters = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRouters.post("/forgot", sendForgotPasswordMailController.handle )
passwordRouters.post("/reset", resetPasswordUserController.handle )

export { passwordRouters };