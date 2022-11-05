import { sign } from "jsonwebtoken";
import { Service } from "typedi";

@Service()
export class GenerateTokenProvider {
  async generate(userId: string) {
    const token = await sign({ id: userId }, process.env.SECRET_KEY, {
      subject: userId,
      expiresIn: "1y",
    });
    return token;
  }
}
