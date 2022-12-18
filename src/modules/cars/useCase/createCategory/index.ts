/* eslint-disable prettier/prettier */
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

console.log("Arquivo category")
const categoriesRepository = CategoriesRepository.getInstance();


const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(createCategoryUseCase);
export { createCategoryController };
