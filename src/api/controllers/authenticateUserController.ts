import { Request, Response } from "express";
import Container, { Service } from "typedi";
import { IUser } from "../interface/IUser";
import { AuthenticateLogic } from "../logic/authenticateUser.logic";

@Service()
export class AuthenticateUserController {
  private logic: AuthenticateLogic;

  constructor() {
    this.logic = Container.get(AuthenticateLogic);
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body as IUser;
    const token = await this.logic.authenticate({ email, password });
    return response.status(token ? 200 : 404).json(token);
  }

  async checkIfUserIsAuthenticated(request: Request, response: Response) {
    const authToken = request.headers.authorization;
    const user = await this.logic.checkIfUserIsAuthenticated(authToken);
    return response.status(user ? 200 : 400).json(user);
  }
}
