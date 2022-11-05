import { Express } from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

export const loadMiddlewares = (app: Express) => {
  console.info("Loading cors");
  app.use(
    cors({
      origin: "*",
      exposedHeaders: ["content-type", "content-length"],
      maxAge: 600,
      methods: ["GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS"],
      allowedHeaders: ["Accept", "Content-Type", "Authorization", "x-api-key"],
    })
  );

  console.info("Loading BodyParser");
  app.use(bodyParser.json());

  console.info("Loading Urlencoded");
  app.use(bodyParser.urlencoded({ extended: true }));

  console.info("Loading Helmet");
  app.use(helmet());
};
