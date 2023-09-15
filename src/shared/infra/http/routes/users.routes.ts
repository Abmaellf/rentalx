/* eslint-disable prettier/prettier */
import { Router } from "express";
import  multer  from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCase/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/useCase/profileUserUseCase/ProfileUserController";

  const usersRoutes = Router();

  const uploadAvatar =  multer(uploadConfig);

  const createUserController = new CreateUserController();
  const updateUserAvatarController = new UpdateUserAvatarController();
  const profileUsersController = new ProfileUserController();

  usersRoutes.post("/", createUserController.handler);

  usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"), 
    updateUserAvatarController.handler
  );

  usersRoutes.get(
    "/profile", 
    ensureAuthenticated, 
    profileUsersController.handler 
  )

export { usersRoutes };

