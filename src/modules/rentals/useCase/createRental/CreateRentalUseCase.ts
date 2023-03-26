// retired para o provider import  dayjs  from "dayjs";
// retired para o provider import utc from 'dayjs/plugin/utc'
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

// retirado para o provider dayjs.extend(utc);


interface IRequest {
  user_id: string;
  car_id:string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase{
 
constructor(
  @inject("RentalsRepository")
  private rentalsRepository: IRentalsRepository,
  @inject("DayjsDateProvider")
  private dateProvider: IDateProvider,
  @inject("CarsRepository")
  private carsRepository: ICarsRepository
  ){}

  async execute({
    user_id, 
    car_id, 
    expected_return_date
  }:IRequest):Promise<Rental>{

    const minimumHours  = 24;
    //Não deve ser possible cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if(carUnavailable){
      throw new AppError("Car is not available")
    }

    
     //Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
       
    if(rentalOpenToUser){
      throw new AppError("There's a rental in progress for user!")
    }
   const  dateNow = this.dateProvider.dateNow();
    //O aluguel deve ter duração minima de 24 horas
    
   //const expectedReturnDateFormat = dayjs(expected_return_date);
    //No meu exemplo eu não converto o expectedReturnForma, por tanto não tinha chamado mas vou tentar
    
    
    // removido const dateNow = this.dateProvider.convertToUTC()


    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date, 
    
    ) // retirado para o provider expectedReturnDateFormat.diff(dayjs(dateNow), 'h')
   //console.log(compare);
    if(compare < minimumHours){
      throw new AppError("Invalid return time!");
    }

   const rental = await this.rentalsRepository.create({
      user_id,
      car_id, 
      expected_return_date
    });

    await this.carsRepository.updateAvaileable(car_id, false);
    return rental;
  }


} export {CreateRentalUseCase };