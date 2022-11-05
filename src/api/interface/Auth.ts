import { IUser } from "./IUser";

export interface IAuth {
  user: IUser;
  token: string;
}
