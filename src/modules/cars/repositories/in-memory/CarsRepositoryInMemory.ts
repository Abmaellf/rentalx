/* eslint-disable prettier/prettier */
import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  
  
  
  cars: Car[] = [];
  
  async create( data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

     Object.assign(car,
      data
      //Na aula 13 - chapter IV - Finalizando CreateCarSpecificationUseCase, a prof. manda adicionar o 
      //id dentro do parameto do metodo create e também no segundo parametro do assing, 
      //Mas no meu caso eu estou passando o objeto que é do tipo ICreateCarDTO e já adicionei esse id
      /** 
                    brand,
                    category_id,
                    daily_rate,
                    description,
                    fine_amount,
                    name,
                    license_plate,
                    id,
                */
      );
    this.cars.push(car);
    
    return car;
    
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return  this.cars.find((car) => car.license_plate === license_plate);
    
  }


  async findAvailable(
    brand?: string, 
    category_id?: string, 
    name?:string
    ): Promise<Car[]> {

    const all = this.cars.filter((car) => {
      if(
        car.available === true ||
        ((brand && car.brand === brand) || 
          (category_id && car.category_id === category_id) ||
          (name && car.name === name))
      ){
        return car;
      }
      return null;
    });

   return all;
  } 
  
  async findById(id: string): Promise<Car> {
    return this.cars.find((car)=> car.id === id
    );
  }


  async updateAvaileable(id: string, available: boolean): Promise<void> {
    const findIndex =  this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }


} 
export { CarsRepositoryInMemory}
