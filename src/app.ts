import { loadMiddlewares } from "./api/middlewares";
import * as AppRouters from "./config/routers";
import { TypeOrmConnection } from "./config/database";
import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
import Container from "typedi";

export const build = async () => {
  const app: Express = express();
  const database = Container.get(TypeOrmConnection);

  console.info("Loading database connection");
  await database.connect();

  loadMiddlewares(app);
  AppRouters.load(app);

  console.info("Loading Error Middleware");
  AppRouters.errorHandler(app);

  return app;
};
