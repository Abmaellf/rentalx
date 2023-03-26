/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */

import { CategoriesRepositoyInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoyInMemory;

/* eslint-disable prettier/prettier */
describe("Create Category", () =>{

        beforeEach(()=>{
                categoriesRepositoryInMemory = new CategoriesRepositoyInMemory();
                createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);

        })
                
        it("should be able to create a new category", async ()=>{

                const category = {

                        name:"Category test",
                        description: "Category description Test"

                }
                await createCategoryUseCase.execute({
                     name: category.name,
                     description: category.description  
                });
             const categoryCreated =  await   categoriesRepositoryInMemory.findByName(category.name)

             console.log(categoryCreated);

             expect(categoryCreated).toHaveProperty("id"); 
             expect(categoryCreated).toHaveProperty("description"); 
        });


                
        it("should not be able to create a new category with name exists", async ()=>{

                const category = {

                        name:"Category test",
                        description: "Category description Test"
                };

                await createCategoryUseCase.execute({
                     name: category.name,
                     description: category.description  
                });

                await expect( 
                        createCategoryUseCase.execute({
                                name: category.name,
                                description: category.description  
                       })
                ).rejects.toEqual(new AppError("Category already exists"));
             
        });
});
