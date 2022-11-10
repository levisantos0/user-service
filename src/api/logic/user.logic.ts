import { IUser } from "../interface/IUser";
import { UserRepository } from "../repositories/user.repository";
import { Container, Service } from "typedi";
import * as bcryptjs from "bcryptjs";
import { BadRequestError, UnprocessedEntityError } from "../helpers/api-erros";

@Service()
export class UserLogic {
  private repository: UserRepository;

  constructor() {
    this.repository = Container.get(UserRepository);
  }

  async register(data: IUser) {
    if (!data.email) {
      throw new UnprocessedEntityError("Email is required");
    }

    const userAlreadyExists = await this.repository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new BadRequestError("User already exists");
    }

    const createdAt: Date = new Date();
    const updatedAt: Date = new Date();
    data.password = await bcryptjs.hash(data.password, 8);

    const dataToCreate: IUser = { ...data, createdAt, updatedAt };

    const user = this.repository.register(dataToCreate);
    return user;
  }
}
