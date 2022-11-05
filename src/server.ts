import "reflect-metadata";
import { Express } from "express";
import { PORT, environment } from "./config/envs/app-envs";

export const init = (app: Express) => {
  app.listen(PORT, () =>
    console.info(
      `Server is running on port ${PORT}, Environment: ${environment} 🚀`
    )
  );
};
