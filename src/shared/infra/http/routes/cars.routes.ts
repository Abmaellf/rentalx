/* eslint-disable prettier/prettier */
import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListAvailableCarsControlle } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCase/uploadCarImage/UploadCarImagesController";
import uploadConfig from "../../../../config/upload";
import multer from "multer";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsControlle = new ListAvailableCarsControlle();
const createCarSpecificationsController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload =  multer(uploadConfig)

carsRoutes.post("/",ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available",listAvailableCarsControlle.handle )

carsRoutes.post(
  "/specifications/:id", 
  ensureAuthenticated, 
  ensureAdmin, 
  createCarSpecificationsController.handle
); 

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated, 
  ensureAdmin,
  upload.array("images") ,
  uploadCarImagesController.handler);

export { carsRoutes };
