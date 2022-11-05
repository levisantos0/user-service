import { Express } from "express";
require("dotenv").config();
import * as App from "./app";
import * as Server from "./server";

const Bootstrap = async () => {
  const app: Express = await App.build();
  Server.init(app);
};

Bootstrap();
