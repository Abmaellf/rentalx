/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
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
  entities:[Category, Specification],
  // eslint-disable-next-line spaced-comment
  //migrations:["./src/database/migrations/*.ts"],
  migrations:[CreateCategories1671248307194, CreateSpecifications1671761210649, CreateUsers1671792403636],
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