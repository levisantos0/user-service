import { Service } from "typedi";
import { User } from "../entities/User";
import { Repository, getRepository } from "typeorm";
import { IUser } from "../interface/IUser";

@Service()
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async register(data: IUser) {
    try {
      const user = await this.repository.create({
        email: data.email,
        name: data.name,
        password: data.password,
        admin: data.admin,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });

      await this.repository.save(data);
      user.password = undefined;

      return user;
    } catch ({ code, driverError }) {
      throw new Error(
        `User repository error, code: ${code}, driverError: ${driverError}`
      );
    }
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({
      deletedAt: null,
      email,
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.repository.findOne({
      deletedAt: null,
      id,
    });

    return user;
  }
}
