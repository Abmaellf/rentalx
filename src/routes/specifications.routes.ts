import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCase/createSpecifications/CreateSpecificationController";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post("/", createSpecificationController.handler);

export { specificationsRoutes };
