import request from "supertest";
import { app } from "@shared/infra/http/app";

describe("Create category controller",  () =>{
  it("test",  ()=>{

     request(app).get("/cars/available").expect(200);

  });
});