import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "@modules/cars/useCase/listCar/ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars ",()=>{

  beforeEach(()=>{
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able  to list  all available cars ", async ()=>{
    const car = await carsRepositoryInMemory.create({
      name:"Car1",
      description:"Carro em espera",
      daily_rate: 110.0,
      license_plate: "DEF-3555",
      fine_amount: 40,
      brand:"Audi" ,
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});
    
    expect(cars).toEqual([car])

  });




  it("should be able to list all avalible cars by name", async ()=>{

    const car = await carsRepositoryInMemory.create({
      name:"Car2",
      description:"Carro em espera",
      daily_rate: 110.0,
      license_plate: "DEF-3555",
      fine_amount: 40,
      brand:"Car_brand_test" ,
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test"
    });

    console.log(car);
    
    expect(cars).toEqual([car])

  })
});