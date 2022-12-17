/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/model/Category";
import { Specification } from "../modules/cars/model/Specification";
import { CreateCategories1671248307194 } from "./CreateCategories";

const dataSource = new DataSource({
  type:"postgres",
  host:"localhost",
  port:5432,
  username:"docker",
  password: "database_ignite",
  database:"rentx",
  entities:[Category,Specification],
  // eslint-disable-next-line spaced-comment
  //migrations:["./src/database/migrations/*.ts"],
  migrations:[CreateCategories1671248307194],
  cli: {
     migrationsDir: "./src/database/migrations/"
}
 
})



dataSource.initialize()
    .then(() => {
        console.log("Banco de dados criado")
    })
    .catch((error) => console.log(error, "Não criado"))
    
export default dataSource;

