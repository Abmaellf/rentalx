import { SendForgotPasswordMailController } from "@modules/accounts/useCase/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRouters = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRouters.post("/forgot", sendForgotPasswordMailController.handler )

export { passwordRouters };