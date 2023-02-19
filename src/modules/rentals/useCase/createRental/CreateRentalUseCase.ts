import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

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

   const rental = await this.rentalRepositoy.create({
      user_id,
      car_id, 
      expected_return_date
    });
    return rental;

  }
} export {CreateRentalUseCase };