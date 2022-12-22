/* eslint-disable spaced-comment */
import express from "express";
import swaggerUi from "swagger-ui-express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createConnection } from "./database/dataSource";
import "./shared/container";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running"));
