import  dayjs  from "dayjs";
import utc from 'dayjs/plugin/utc'
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);


interface IRequest {
  user_id: string;
  car_id:string;
  expected_return_date: Date;
}

class CreateRentalUseCase{

  

constructor(
  private rentalRepositoy: IRentalRepository){}

  async execute({
    user_id, 
    car_id, 
    expected_return_date
  }:IRequest):Promise<Rental>{

    const minimumHours  = 24;
    //Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalRepositoy.findOpenRentalByCar(car_id);

    if(carUnavailable){
      throw new AppError("Car is unavailable")
    }

    
     //Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
    const rentalOpenToUser = await this.rentalRepositoy.findOpenRentalByUser(user_id);
       
    if(rentalOpenToUser){
      throw new AppError("There's a rental in progress for user!")
    }

    //O aluguel deve ter duração minima de 24 horas
    const dateNow = dayjs().utc().local().format();
    const expectedReturnDateFormat = dayjs(expected_return_date);

   console.log("Hoje ", dayjs(dateNow).format());
   console.log("Mnha data expectedReturnDateFormat  ", dayjs(expectedReturnDateFormat).format());
   const compareHoras = expectedReturnDateFormat.diff(dayjs(dateNow), 'h')
   console.log(  "A diferença entre Minha data em horas  ", compareHoras," horas");
    
    if(compareHoras < minimumHours){
      throw new AppError("Invalid return time! ");
    }

   const rental = await this.rentalRepositoy.create({
      user_id,
      car_id, 
      expected_return_date
    });
    return rental;

  }
} export {CreateRentalUseCase };