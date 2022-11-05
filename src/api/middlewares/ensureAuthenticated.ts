import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import Container, { Service } from "typedi";
import { UnauthorizedError } from "../helpers/api-erros";
import { AuthHelper } from "../helpers/authHelper";
import { UserRepository } from "../repositories/user.repository";

type JwtPayload = {
  id: string;
};

@Service()
export class EnsureAuthenticatedMiddleware {
  private repository: UserRepository;
  private authHelper: AuthHelper;

  constructor() {
    this.repository = Container.get(UserRepository);
    this.authHelper = Container.get(AuthHelper);
  }

  public ensureAuthenticated = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const authToken = request.headers.authorization;

    const [, token] = authToken.split(" ");
    if (!token) {
      throw new UnauthorizedError("Token is missing");
    }
    try {
      const { id } = verify(token, process.env.SECRET_KEY) as JwtPayload;

      const userAlreadyExists = await this.repository.findById(id);
      if (!userAlreadyExists) {
        throw new UnauthorizedError("Token invalid");
      }

      const { password: _, ...loggedUser } = userAlreadyExists;

      this.authHelper.setAuth({ user: loggedUser, token });
    } catch (error) {
      throw new UnauthorizedError("Token invalid");
    } finally {
      next();
    }
  };
}
