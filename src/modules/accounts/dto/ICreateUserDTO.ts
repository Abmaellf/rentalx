/* eslint-disable prettier/prettier */
interface ICreateUserDTO {

    name: string;
    password: string;
    email: string;
    driver_license: any;
    id?:string;
    avatar?: string;

}
export { ICreateUserDTO };

