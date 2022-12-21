import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}
    handler(request: Request, response: Response): Response {
        const all = this.listCategoriesUseCase.execute();
        return response.json(all);
    }
}
export { ListCategoriesController };
