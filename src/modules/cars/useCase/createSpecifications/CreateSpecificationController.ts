import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    handler(request: Request, response: Response): Response {
        const { name, description } = request.body;

        const createSpecificationUseCase = container.resolve(
            CreateSpecificationUseCase
        );
        try {
            createSpecificationUseCase.execute({ name, description });
            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}
export { CreateSpecificationController };
