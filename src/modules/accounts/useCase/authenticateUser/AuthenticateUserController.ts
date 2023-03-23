/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {

    async handler(request: Request, response: Response):Promise<Response> {
        const { password, email } = request.body;

        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );

        const token = await authenticateUserUseCase.execute({
          password, 
          email
        });

        return response.json(token);
    }
}

export { AuthenticateUserController };