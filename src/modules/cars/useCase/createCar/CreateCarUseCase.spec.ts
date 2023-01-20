/* eslint-disable prettier/prettier */
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;



describe("Create Car", () => {

    beforeEach(()=>{
      carsRepositoryInMemory = new CarsRepositoryInMemory()
      createCarUseCase= new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("Should  be to create a new Car", async () => {
      await createCarUseCase.execute({
        name: "Name Car", 
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC 1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category"
    });

})
})
