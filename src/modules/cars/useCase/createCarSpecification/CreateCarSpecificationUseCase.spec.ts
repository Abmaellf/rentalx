import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car Specifications", ()=>{

  beforeEach(()=>{
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
  })

  it("Should not be able to add a new specification to a now-existent car", async () =>{
    await expect( async ()=>{

      const car_id = "1234";
      const specifications_id = ["54321"];

    await createCarSpecificationUseCase.execute({
       car_id, 
       specifications_id
      });
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should be able to add a new specification to the car", async () =>{

    const car = await carsRepositoryInMemory.create({
      
              name: "Name Car", 
              description: "Description car",
              daily_rate: 100,
              license_plate: "ABC 1234",
              fine_amount: 60,
              brand: "Brand",
              category_id: "category"
    });
    console.log(car);
    const car_id = car.id
    console.log(car.id);
    console.log(car_id);
    
    
    const specifications_id = ["54321"];

    await createCarSpecificationUseCase.execute({ 
      car_id,
      specifications_id
    });
  });
});  