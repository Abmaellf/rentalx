/* eslint-disable prettier/prettier */
import { AppError } from "@shared/errors/AppError";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoyInMemory implements ICategoriesRepository {

  categories: Category[]= []

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category)=>category.name === name);
    if(!category){
      throw new AppError("category already not exists");
    }	
	
    return category;
  }

  async list(): Promise<Category[]> {
    const list = this.categories;
    return list;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
      const category = new Category();
      Object.assign(category, {
        name, description
      });

      this.categories.push(category);
  }
}

export { CategoriesRepositoyInMemory };

