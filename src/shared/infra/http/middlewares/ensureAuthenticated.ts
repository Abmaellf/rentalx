/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub:string;
}
 
export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    if(!authHeader){
      throw new AppError("Token Missing", 401)
    }
    const [, token] = authHeader.split(" ");
    try{
        const { sub: user_id } = verify(token, "4d2c777dbe7fea69180384096575743b") as IPayload;
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if(!user){
          throw new AppError("User does not Exists", 401);
        }


        request.user = {
          id: user_id
        }
        next();
    }catch{
            throw new AppError("Invalid token", 401)
    }
}

