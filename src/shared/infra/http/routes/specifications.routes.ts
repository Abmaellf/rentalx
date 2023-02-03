import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCase/createSpecifications/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

//specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handler
);

export { specificationsRoutes };
