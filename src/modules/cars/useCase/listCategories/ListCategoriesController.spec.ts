import request from "supertest";
import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm/dataSource";
import { DataSource } from "typeorm";

let connection: DataSource; 

describe("List category controller", () =>{
   

  beforeAll(async () =>{

    connection = await createConnection(); 
    await connection.runMigrations();

    const id = uuidv4();
    const password =  await hash("admin", 8);

     await connection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
      values ('${id}', 'admin', 'admin@rentx.com.br', '${password}' , true, 'now()', 'XXXXX' )`
    )
  })

  afterAll(async ()=>{
    await connection.dropDatabase();
    await connection.destroy()
    
  });


  it("Should be able to list all available categories", async  ()=>{

    const responseToken =  await request(app)
    .post("/sessions")
    .send({
      email: "admin@rentx.com.br",
      password:"admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
    .post("/categories")
     .send({
      
        name:"CategorySupertest List",
        description:"Categoria Super teste List"
      
     }).set({
      Authorization: `Bearer ${refresh_token}`,
     });

     const response = await request(app).get("/categories");

     console.log(response.body);
     
     expect(response.status).toBe(200);
     expect(response.body.length).toBe(1);
     expect(response.body[0]).toHaveProperty("id")
     expect(response.body[0].name).toEqual("CategorySupertest List");

  });

});

