import { Router } from "express";
import multer from "multer";

// import { v4 as uuidv4 } from "uuid";
import { CreateCategoryController } from "../modules/cars/useCase/createCategory/CreateCategoryController";
import { importCategoryController } from "../modules/cars/useCase/importCategory";
import { listCategoriesController } from "../modules/cars/useCase/listCategories";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handler(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handler(request, response);
});

export { categoriesRoutes };
