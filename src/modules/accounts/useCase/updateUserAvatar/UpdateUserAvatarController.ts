/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { AppError } from "@shared/errors/AppError";

class UpdateUserAvatarController {

  async handler(request: Request, response: Response):Promise<Response>{
    const { id } = request.user;

        	
    const avatar_file = request.file?.filename;

    	 
    if(!avatar_file){
      throw new AppError("avatar_file already not exists");
    }	
    
    const updateUserAvatarUseCase =  container.resolve(UpdateUserAvatarUseCase);
    
    await updateUserAvatarUseCase.execute({ user_id:id, avatar_file})

    return response.status(204).send();
  }
}
export { UpdateUserAvatarController };
