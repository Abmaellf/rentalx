/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { dataSource } from "@shared/infra/typeorm/dataSource";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  
  private repository: Repository<Car>;
  

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
    name,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car =  this.repository.create({
      brand, 
      category_id, 
      daily_rate, 
      description, 
      fine_amount, 
      license_plate, 
      name,
      specifications,
      id
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


  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery =  await this.repository
        .createQueryBuilder("c")
        .where("available = :available", { available: true});

    if(brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if(name) {
      carsQuery.andWhere("c.name =  :name", { name });
    }

    if(category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
    
  }


  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOneBy({id});
    return car;
  }

  async updateAvaileable(id: string, available: boolean): Promise<void> {
   await this.repository
    .createQueryBuilder()
    .update()
    .set({available})
    .where("id = :id")
    .setParameters({id})
    .execute();

    // update cars set available = 'true' where id =  :id
   }
 

}

export { CarsRepository };