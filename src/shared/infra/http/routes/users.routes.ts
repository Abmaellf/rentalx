/* eslint-disable prettier/prettier */
import { Router } from "express";
import  multer  from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCase/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


  const usersRoutes = Router();

  const uploadAvatar =  multer(uploadConfig);

  const createUserController = new CreateUserController();
  const updateUserAvatarController = new UpdateUserAvatarController();

  usersRoutes.post("/", createUserController.handler);

  usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"), 
    updateUserAvatarController.handler)


export { usersRoutes };

