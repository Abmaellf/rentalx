/* eslint-disable prettier/prettier */
import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListAvailableCarsControlle } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsControlle = new ListAvailableCarsControlle();

carsRoutes.post("/",ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available",listAvailableCarsControlle.handle )

export { carsRoutes };
