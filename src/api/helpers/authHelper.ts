import { Service } from "typedi";
import { IAuth } from "../interface/Auth";

@Service()
export class AuthHelper {
  private auth: IAuth;

  setAuth(auth: IAuth) {
    this.auth = auth;
  }

  isAuthenticated() {
    return this.auth !== undefined;
  }

  user(): IAuth | null {
    return this.isAuthenticated() ? this.auth : null;
  }

  token(): string | null {
    return this.isAuthenticated() ? this.auth.token : null;
  }
}
