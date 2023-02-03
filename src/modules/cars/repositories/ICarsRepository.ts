/* eslint-disable prettier/prettier */
import { ICreateCarDTO } from "../dto/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string):Promise<Car>;
    findAvaileble(brand?: string, category_id?: string, name?:string): Promise<Car[]>;

}
export { ICarsRepository };
