import { ICreateUserDTO } from "../dto/ICreateUserDTO";

interface IUsersRepository {
    create(data: ICreateUserDTO): void {

    }
}
 export { IUsersRepository}