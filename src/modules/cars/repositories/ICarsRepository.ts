/* eslint-disable prettier/prettier */
import { ICreateCarDTO } from "../dto/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<void>;
    findByLicensePlate(license_plate: string):Promise<Car>;

}
export { ICarsRepository };
