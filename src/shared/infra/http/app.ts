/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import-helpers/order-imports */
import "express-async-errors";
import "reflect-metadata";
import * as Sentry from "@sentry/node";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";

import "@shared/container";

import upload from "@config/upload";
import cors from "cors";

import swaggerFile from "../../../../src/swagger.json";

import { router } from "./routes";
import { rateLimitMiddleware } from "./middlewares/rateLimiter";

require('dotenv').config()

const app = express();

app.use(rateLimitMiddleware);

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });



app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

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

export { app };
