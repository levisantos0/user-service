export interface IUser {
  name: string;
  email: string;
  password?: string;
  admin?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
