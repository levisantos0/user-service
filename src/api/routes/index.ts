import { Router } from "express";
import { AuthRouters } from "./authenticate";
import { UserRouters } from "./user";

export const getRoutes = () => {
  const router = Router();
  router.use(UserRouters());
  router.use(AuthRouters());

  return router;
};
