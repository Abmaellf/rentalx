import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";
import { AppError } from "@shared/errors/AppError";


  class RentalsRepositoryInMemory implements IRentalsRepository {
   
   

    rentals: Rental[]=[];

    async findOpenRentalByCar(car_id: any): Promise<Rental> {
      const rental = this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
      if(!rental){
        throw new AppError("users_tokens already not exists");
      }	
      return rental;
    }

    async findOpenRentalByUser(user_id: any): Promise<Rental> {

      const rental = this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);

      if(!rental){
        throw new AppError("users_tokens already not exists");
      }	
      return rental;
    }

    async create({car_id, user_id, expected_return_date}: ICreateRentalDTO): Promise<Rental> {

      const rental = new Rental();

      Object.assign(rental, {
        car_id, 
        user_id, 
        expected_return_date,
        start_date: new Date(),
      });
      
      this.rentals.push(rental);

      return rental;
    }

    async findById(id: string): Promise<Rental> {
      const rental = this.rentals.find((rental)=> rental.id === id)
      if(!rental){
        throw new AppError("users_tokens already not exists");
      }	
      return rental;
    }


    async findByUser(user_id: string): Promise<Rental[]> {
      return this.rentals.filter((rental)=> rental.user_id === user_id)
    }

  }
  export { RentalsRepositoryInMemory };