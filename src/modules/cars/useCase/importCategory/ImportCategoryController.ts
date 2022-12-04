import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

    handler(request: Request, response: Response): Response {
        const { file } = request;
        this.importCategoryUseCase.execute(file);

        return response.send();
    }
}

export { ImportCategoryController };
