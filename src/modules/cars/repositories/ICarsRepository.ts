/* eslint-disable prettier/prettier */
import { ICreateCarDTO } from "../dto/ICreateCarDTO";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<void>;

}
export { ICarsRepository };
