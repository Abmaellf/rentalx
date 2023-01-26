/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import dataSource from "@shared/infra/typeorm/dataSource";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  
  private repository: Repository<Car>;
   // eslint-disable-next-line no-use-before-define

  constructor(){
    this.repository = dataSource.getRepository(Car)
  }

  async create({
    brand, 
    category_id, 
    daily_rate, 
    description, 
    fine_amount, 
    license_plate, 
    name
  }: ICreateCarDTO): Promise<Car> {
    const car =  this.repository.create({
      brand, 
      category_id, 
      daily_rate, 
      description, 
      fine_amount, 
      license_plate, 
      name
    });

    await this.repository.save(car);

    return car;
  }


  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({
      license_plate
    });
    return car;
  }

}

export { CarsRepository };