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
} 
export { CarsRepositoryInMemory}
