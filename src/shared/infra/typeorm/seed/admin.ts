/* eslint-disable prettier/prettier */
/* eslint-disable spaced-comment */

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid';

//import  dataSource  from "@shared/infra/typeorm/dataSource";
import   createConnection  from "@shared/infra/typeorm/dataSource";

async function create() {

  const conection = await createConnection("localhost");

  const  id = uuidV4();
  const password =  await hash("admin", 8)

  conection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
  values ('${id}', 'admin', 'admin@rentx.com.br', '${password}' , true, 'now()', 'XXXXX' )`

  )

  await conection.destroy();




// const conection = dataSource.query(
//   `INSER INTO USERS (id, name, email, password, admin, created_at)
//   values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, ${new Date()} ) `
// )
}

create().then(() => console.log("User admin created"))