/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";

import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { AlterUserAddAvatar1673064449480 } from "./migrations/AlterUserAddAvatar";
import { AlterUserDeleteUsername1672703783872 } from "./migrations/AlterUserDeleteUsername";
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
  entities:[Category, Specification, User],
  // eslint-disable-next-line spaced-comment
  //migrations:["./src/database/migrations/*.ts"],
  migrations:[
              CreateCategories1671248307194, 
              CreateSpecifications1671761210649, 
              CreateUsers1671792403636,
              AlterUserDeleteUsername1672703783872,
              AlterUserAddAvatar1673064449480
            ],
  cli: {
     migrationsDir: "./src/database/migrations/"
}
})


export function createConnection(
    host = 'database',
  ): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
  }

  export default dataSource;