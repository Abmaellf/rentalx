import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

  interface IRequest {
    id: string;
    user_id: string;
  }

  @injectable()
  class DevolutionRentalUseCase {

    constructor(
      @inject("RentalsRepository")
      private rentalsRepository: RentalsRepository,
      @inject("CarsRepository")
      private carsRepository: CarsRepository,
      @inject("DayjsDateProvider")
      private dateProvider: IDateProvider,
    ){}
       async execute({id, user_id}:IRequest): Promise<Rental>{

         const rental =  await this.rentalsRepository.findById(id);
         const car = await this.carsRepository.findById(rental.car_id);
         const minimum_daily = 1;

         if(!rental){
            throw new Error("Rental does not exists!")
         }

         //Verificar o tempo de aluguel
         const dateNow = this.dateProvider.dateNow();

         let daily = this.dateProvider.compareInDays(
          rental.start_date,
          this.dateProvider.dateNow()
         );

         if(daily<= 0){
          daily = minimum_daily;
         }
         const delay = this.dateProvider.compareInDays(
          dateNow, rental.expected_return_date
         );

         let total = 0;

         if(delay > 0 ){
          const calculete_fine = delay * car.fine_amount;
          total = calculete_fine;
         }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvaileable(car.id, true);
        return rental;

          
      }
  }
  export { DevolutionRentalUseCase };