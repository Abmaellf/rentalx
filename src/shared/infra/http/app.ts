import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerFile from "../../../../src/swagger.json"
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import "reflect-metadata";

import "@shared/container";
import { router } from "./routes";

const app = express();



app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message} `,
        });
    }
);

export { app};
