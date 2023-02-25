import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import dataSource from "@shared/infra/typeorm/dataSource";
import { Repository } from "typeorm";

  class RentalsRepository implements IRentalsRepository {

    private repository: Repository<Rental>

    constructor(){
      this.repository = dataSource.getRepository(Rental)
    }

    /*
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
      const openByCar = await this.repository.findOneBy({ car_id})
      return openByCar;
    }
    */

  /**/
async findOpenRentalByCar(car_id: string): Promise<Rental> {
  const rentalQuery = this.repository
      .createQueryBuilder("r")
      .where("r.end_date is null")
      .andWhere("r.car_id = :car_id", { car_id });

  const rental = await rentalQuery.getOne();

  return rental;  
}


/*
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
      const openByUser = await this.repository.findOneBy({ user_id})
      return openByUser;
    }
*/
async findOpenRentalByUser(user_id: string): Promise<Rental> {
  const rentalQuery = this.repository
      .createQueryBuilder("r")
      .where("r.end_date is null")
      .andWhere("r.user_id = :user_id", { user_id });

  const rental = await rentalQuery.getOne();

  return rental;
}


    async create({ 
      user_id,
      car_id,
      expected_return_date, 
      
    }: ICreateRentalDTO): Promise<Rental> {
      const rental = this.repository.create({
        user_id, car_id, expected_return_date
      });

      await this.repository.save(rental);

      return rental; 
      
    }
   }
  export { RentalsRepository}