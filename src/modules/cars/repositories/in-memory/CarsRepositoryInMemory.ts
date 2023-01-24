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
} export { CarsRepositoryInMemory}
