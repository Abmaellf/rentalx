import  dayjs  from "dayjs";
import utc from 'dayjs/plugin/utc'
//import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../../rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import AdvancedFormat from "dayjs/plugin/advancedFormat"
import { DayjsDateProvider } from "@shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";

dayjs.extend(utc);
dayjs.utc().local().format();

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider:DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental ", ()=>{

  const hoje= dayjs().utc().local().format();

  const dayAdd24Hours = dayjs(hoje).add(1,'day').toDate();
    
  
  beforeEach(()=>{

    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();

    carsRepositoryInMemory = new CarsRepositoryInMemory();

    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
        rentalsRepositoryInMemory, 
        dayjsDateProvider,
        carsRepositoryInMemory);
  });

  it("should be able to create a new rental", async ()=>{

    const car = await carsRepositoryInMemory.create({
      name:"Test",
      description:"Car test",
      daily_rate:100,
      license_plate:"test",
      fine_amount:40,
      category_id:"1234",
      brand:"brand"
    })
    const rental = await createRentalUseCase.execute({
      user_id:"1234",
      car_id:car.id,
      expected_return_date:dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  });


  it("should not be able to create a new rental if there is another open to the same user", async ()=>
  { 
    const car = await rentalsRepositoryInMemory.create({
    user_id: "12345",
    car_id: "1212121",
    expected_return_date: dayAdd24Hours,
  })
 
  await expect(
      createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12121212",
      expected_return_date: dayAdd24Hours,
    })
  ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  });



  it("should not be able to create a new rental if there is another open to the  same  car", async ()=>
  {  
    await rentalsRepositoryInMemory.create({
    user_id: "12345",
    car_id: "1212121",
    expected_return_date: dayAdd24Hours,
  });
  await expect(
     createRentalUseCase.execute({
      user_id: "321",
      car_id: "1212121",
      expected_return_date: dayAdd24Hours,
    })
  ).rejects.toEqual(new AppError("Car is not available"))
  });




  it("should not be able to create a new rental with invalid return time", async ()=>
  {  
    await expect(createRentalUseCase.execute({
      user_id: "123",
      car_id: "12121212",
      expected_return_date: dayjs().toDate(),
    })

  ).rejects.toEqual(new AppError("Invalid return time!"))
  })
})
