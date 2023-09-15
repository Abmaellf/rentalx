import { instanceToInstance } from "class-transformer"
import { IUserResponseDTO } from "../dto/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User"; 

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url
    
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url
    })
    return user

  }
}
export { UserMap};