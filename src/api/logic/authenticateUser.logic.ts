import Container, { Service } from "typedi";
import { compare } from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { GenerateTokenProvider } from "../providers/generateTokenProvider";
import { verify } from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";

interface IRequest {
  email: string;
  password: string;
}

type JwtPayload = {
  id: string;
};

@Service()
export class AuthenticateLogic {
  private repository: UserRepository;
  private tokenProvider: GenerateTokenProvider;

  constructor() {
    this.repository = Container.get(UserRepository);
    this.tokenProvider = Container.get(GenerateTokenProvider);
  }

  async authenticate({ email, password }: IRequest) {
    const userAlreadyExists = await this.repository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new BadRequestError("User or password incorrect!");
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);
    if (!passwordMatch) {
      throw new BadRequestError("User or password incorrect!");
    }

    const token = await this.tokenProvider.generate(userAlreadyExists.id);

    return { token };
  }

  async checkIfUserIsAuthenticated(authToken: string) {
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
      return loggedUser;
    } catch (error) {
      throw new UnauthorizedError("Token invalid");
    }
  }
}
