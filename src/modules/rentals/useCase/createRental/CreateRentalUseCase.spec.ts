import  dayjs  from "dayjs";
import utc from 'dayjs/plugin/utc'
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import AdvancedFormat from "dayjs/plugin/advancedFormat"
import { DayjsDateProvider } from "@shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

dayjs.extend(utc);
dayjs.utc().local().format();

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider:DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental ", ()=>{
  const hoje= dayjs().utc().local().format()
  const dayAdd24Hours = dayjs(hoje).add(1,'day').toDate();
    
  
  beforeEach(()=>{

    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
        rentalsRepositoryInMemory, 
        dayjsDateProvider,carsRepositoryInMemory);
  });

  it("should be able to create a new rental", async ()=>{
    const rental = await createRentalUseCase.execute({
      user_id:"123456",
      car_id:"121212",
      expected_return_date:dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  });


  it("should not be able to create a new rental if there is another open to the  same  user", async ()=>
  {     
    expect(async ()=>{
      await createRentalUseCase.execute({
        user_id:"123456",
        car_id:"121212",
        expected_return_date:dayAdd24Hours,
      });
  
     await createRentalUseCase.execute({
        user_id:"123456",
        car_id:"121212",
        expected_return_date:dayAdd24Hours,
      });    
    }).rejects.toBeInstanceOf(AppError)
  });



  it("should not be able to create a new rental if there is another open to the  same  car", async ()=>
  {  
    console.log("Data dentro do test",dayAdd24Hours);   
    expect(async ()=>{
      await createRentalUseCase.execute({
        user_id:"123",
        car_id:"test",
        expected_return_date:dayAdd24Hours,
      });
  
       await createRentalUseCase.execute({
        user_id:"321",
        car_id:"test",
        expected_return_date:dayAdd24Hours,
      });    
    }).rejects.toBeInstanceOf(AppError)
  });




  it("should not be able to create a new rental with invalid return time", async ()=>
  {  
      
    expect(async ()=>{
     await createRentalUseCase.execute({
      user_id:"123",
      car_id:"test",
      expected_return_date:dayjs().toDate(),
    });
     
    }).rejects.toBeInstanceOf(AppError) 
  });


});
