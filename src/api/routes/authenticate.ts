import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import { EnsureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "../controllers/authenticateUserController";

export const AuthRouters = () => {
  const ensureAuthenticatedMiddleware = Container.get(
    EnsureAuthenticatedMiddleware
  );
  const controller = Container.get(AuthenticateUserController);
  const router = Router();

  router.post(
    "/user/authenticate",
    async (req: Request, res: Response, next: NextFunction) =>
      await controller.authenticate(req, res)
  );

  router.get(
    "/user/self",
    async (req: Request, res: Response, next: NextFunction) =>
      await controller.checkIfUserIsAuthenticated(req, res)
  );

  return router;
};
