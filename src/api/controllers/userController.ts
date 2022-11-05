import { Request, Response } from "express";
import Container, { Service } from "typedi";
import { IUser } from "../interface/IUser";
import { UserLogic } from "../logic/user.logic";

@Service()
export class UserController {
  private logic: UserLogic;

  constructor() {
    this.logic = Container.get(UserLogic);
  }

  async register(request: Request, response: Response) {
    try {
      const data: IUser = request.body;

      const user = await this.logic.register(data);

      return response.status(user ? 201 : 400).json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
