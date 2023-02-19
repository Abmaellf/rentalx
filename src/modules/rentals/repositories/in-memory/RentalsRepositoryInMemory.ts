import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "../IRentalRepository";


  class RentalsRepositoryInMemory implements IRentalRepository {

    rentals: Rental[]=[];

    async findOpenRentalByCar(car_id: any): Promise<Rental> {
      return this.rentals.find(rental => rental.car_id === car_id && rental.end_date === null);
    }

    async findOpenRentalByUser(user_id: any): Promise<Rental> {
      return this.rentals.find(rental => rental.user_id === user_id && rental.end_date === null);
    }

  }
  export { RentalsRepositoryInMemory };