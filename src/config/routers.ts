import { Router, Express, NextFunction, Request, Response } from "express";
import * as YAMLJS from "yamljs";
import * as swaggerUi from "swagger-ui-express";
import { getRoutes } from "../api/routes";
import { ApiError } from "../api/helpers/api-erros";

export const load = (app: Express) => {
  try {
    const router = Router();

    router.use("/", getRoutes());

    const swaggerDocument = YAMLJS.load("./swagger.yml");
    router.use("^/$", (req, res) => {
      return res.redirect("/api-docs");
    });
    router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(router);
  } catch (error) {
    console.error(error);
  }
};

export const errorHandler = (app: Express) => {
  app.use(
    (
      error: Error & Partial<ApiError>,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      console.info("Loading Error Handler");

      const statusCode = error.statusCode ?? 500;
      const message = error.statusCode
        ? error.message
        : " Internal server Error";
      return response.status(statusCode).json({ message });
    }
  );
};
