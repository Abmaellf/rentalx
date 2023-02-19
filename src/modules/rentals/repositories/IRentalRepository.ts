import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalRepository {
  findOpenRentalByCar(car_id):Promise<Rental>

  findOpenRentalByUser(user_id): Promise<Rental>;
}
export { IRentalRepository };