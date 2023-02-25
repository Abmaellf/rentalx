import request from "supertest";
import { app } from "@shared/infra/http/app";

describe("Create category controller",  () =>{
  it("Should be able to create a new category", async  ()=>{
     
    const response  = await request(app).post("/categories").expect(200)
     .send({
      
        name:"CategorySupertest",
        description:"Categoria Super teste"
      
     });

     expect(response.status).toBe(201)

  });
});

/*
  Acessar o banco de dados para criar o banco de test 
  create database rentx_test
*/