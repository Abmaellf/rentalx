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
  }:IRequest):Promise<void>{
    //Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalRepositoy.findOpenRentalByCar(car_id);

    if(carUnavailable){
      throw new AppError("Car is unavailable")
    }

    
    //O aluguel deve ter duração minima de 24 horas
    const rentalOpenToUser = await this.rentalRepositoy.findOpenRentalByUser(user_id);
    //Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
    
    if(rentalOpenToUser){
      throw new AppError("There's a rental in progress for user!")
    }


  }
} export {CreateRentalUseCase };