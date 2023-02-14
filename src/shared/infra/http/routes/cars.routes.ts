/* eslint-disable prettier/prettier */
import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListAvailableCarsControlle } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsControlle = new ListAvailableCarsControlle();
const createCarSpecificationsController = new CreateCarSpecificationController();

carsRoutes.post("/",ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available",listAvailableCarsControlle.handle )

carsRoutes.post(
  "/specifications/:id", 
  ensureAuthenticated, 
  ensureAdmin, 
  createCarSpecificationsController.handle
); 

export { carsRoutes };
