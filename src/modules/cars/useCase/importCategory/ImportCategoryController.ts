import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { AppError } from "@shared/errors/AppError";

class ImportCategoryController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        if(!file){
          throw new AppError("file already not exists");
        }
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        await importCategoryUseCase.execute(file);

        return response.status(201).send();
    }
}

export { ImportCategoryController };
