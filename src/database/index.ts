/* eslint-disable prettier/prettier */
// import { createConnection } from "typeorm";
// createConnection();
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/model/Category";
import { Specification } from "../modules/cars/model/Specification";

export const dataSource = new DataSource({
  type:"postgres",
  port:5432,
  username:"abmael",
  password: "abmael",
  database:"rentx",
  entities:[
    Category,
    Specification
  ],
  migrations:[

  ]

});

