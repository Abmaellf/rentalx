import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid';

import  { dataSource }  from "@shared/infra/typeorm/dataSource";
import { createConnection } from "@shared/infra/typeorm/dataSource";
import { DataSource } from 'typeorm';
//import   createConnection  from "@shared/infra/typeorm/dataSource";

async function create() {

  //1 - const connection = await createConnection("localhost");
  //2 - const connection = await dataSource.createConnection("localhost");
  // const conection = await dataSource.initialize();
  let connection: DataSource; 

  const  id = uuidV4();
  const password =  await hash("admin", 8)
  connection = await createConnection(); 

  connection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
  values ('${id}', 'admin', 'admin@rentx.com.br', '${password}' , true, 'now()', 'XXXXX' )`

  )

  await connection.destroy();
// const conection = dataSource.query(
//   `INSER INTO USERS (id, name, email, password, admin, created_at)
//   values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, ${new Date()} ) `
// )
}

create().then(() => console.log("User admin created"))