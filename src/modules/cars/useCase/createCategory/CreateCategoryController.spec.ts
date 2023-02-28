import request from "supertest";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm/dataSource";
import { DataSource } from "typeorm";

let connection: DataSource; 

describe("Create category controller", () =>{
   

  beforeAll(async () =>{

    connection = await createConnection(); 
    await connection.runMigrations();

    const id = uuid();
    const password =  await hash("admin", 8);

     await connection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
      values ('${id}', 'admin', 'admin@rentx.com.br', '${password}' , true, 'now()', 'XXXXX' )`
    )
  })

  afterAll(async ()=>{
    await connection.dropDatabase();
    await connection.destroy()
    
  })


  it("Should be able to create a new category", async  ()=>{

    const responseToken =  await request(app).post("/sessions")
    .send({
      email: "admin@rentx.com.br",
      password:"admin",
    });

    const { token } = responseToken.body;

     
    const response  = await request(app).post("/categories")
     .send({
      
        name:"CategorySupertest",
        description:"Categoria Super teste"
      
     }).set({
      Authorization: `Bearer ${token}`,
     });

     expect(response.status).toBe(201);

  });


  /*Segunto test*/


  it("should not be able to create a new category with name exists", async  ()=>{

    const responseToken =  await request(app).post("/sessions")
    .send({
      email: "admin@rentx.com.br",
      password:"admin",
    });

    const { token } = responseToken.body;

     
    const response  = await request(app).post("/categories")
     .send({
      
        name:"CategorySupertest",
        description:"Categoria Super teste"
      
     }).set({
      Authorization: `Bearer ${token}`,
     });

     expect(response.status).toBe(400);

  });



});

/*
  Acessar o banco de dados para criar o banco de test 
  create database rentx_test
*/