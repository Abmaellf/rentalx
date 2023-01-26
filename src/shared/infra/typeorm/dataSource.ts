/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { AlterUserAddAvatar1673064449480 } from "./migrations/AlterUserAddAvatar";
import { AlterUserDeleteUsername1672703783872 } from "./migrations/AlterUserDeleteUsername";
import { CreateCars1674689238520 } from "./migrations/CreateCars";
import { CreateCategories1671248307194 } from "./migrations/CreateCategories";
import { CreateSpecifications1671761210649 } from "./migrations/CreateSpecifications";
import { CreateUsers1671792403636 } from "./migrations/CreateUsers";

const dataSource = new DataSource({
  type:"postgres",
  host:"localhost",
  port:5432,
  username:"docker",
  password: "database_ignite",
  database:"rentx",
  entities:[Category, Specification, User, Car],
  // eslint-disable-next-line spaced-comment
  //migrations:["./src/database/migrations/*.ts"],
  migrations:[
              CreateCategories1671248307194, 
              CreateSpecifications1671761210649, 
              CreateUsers1671792403636,
              AlterUserDeleteUsername1672703783872,
              AlterUserAddAvatar1673064449480,
              CreateCars1674689238520
            ],
  cli: {
     migrationsDir: "./src/shared/infra/typeorm/migrations/"
}
})


export function createConnection(
    host = 'database',
  ): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
  }

  export default dataSource;