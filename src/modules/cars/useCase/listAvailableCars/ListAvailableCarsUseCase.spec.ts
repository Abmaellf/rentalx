import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars ",()=>{

  beforeEach(()=>{
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

    const cars = await listAvailableCarsUseCase.execute({});
    console.log(cars);
    expect(cars).toEqual([car])

  });




  it("should be able to list all avalible cars by brand", async ()=>{

    const car = await carsRepositoryInMemory.create({
      name:"Car2",
      description:"Carro em espera",
      daily_rate: 110.0,
      license_plate: "DEF-3556",
      fine_amount: 40,
      brand:"Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test"
    });
    
  
    expect(cars).toEqual([car])

  });



  it("should be able to list all avalible cars by name", async ()=>{

    const car = await carsRepositoryInMemory.create({
      name:"Car3",
      description:"Carro em espera",
      daily_rate: 110.0,
      license_plate: "DEF-3557",
      fine_amount: 40,
      brand:"Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3"
    });
    
  
    expect(cars).toEqual([car])

  });



  it("should be able to list all avalible cars by category", async ()=>{

    const car = await carsRepositoryInMemory.create({
      name:"Car2",
      description:"Carro em espera",
      daily_rate: 110.0,
      license_plate: "DEF-3556",
      fine_amount: 40,
      brand:"Car_brand_test",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    });
    
  
    expect(cars).toEqual([car])

  });
});