import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import { UserController } from "../controllers/userController";

export const UserRouters = () => {
  const controller = Container.get(UserController);
  const router = Router();

  router.post(
    "/user/register",
    async (req: Request, res: Response, next: NextFunction) =>
      await controller.register(req, res)
  );

  return router;
};
