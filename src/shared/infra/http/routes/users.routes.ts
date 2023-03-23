/* eslint-disable prettier/prettier */
import { Router } from "express";
import  multer  from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCase/createUser/CreateUserController";
import { UpdateUserAvaterController } from "../../../../modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


  const usersRoutes = Router();

 const uploadAvatar =  multer(uploadConfig.upload("./tmp/avatar"))

  const createUserController = new CreateUserController();
  const updateUserAvaterController = new UpdateUserAvaterController();

  usersRoutes.post("/", createUserController.handler);

  usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"), 
    updateUserAvaterController.handler)


export { usersRoutes };

