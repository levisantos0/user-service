export class DataBaseEnvs {
  static readonly dialect = process.env.DATABASE_DIALECT;

  static readonly host = process.env.DATABASE_HOST;

  static readonly username = process.env.DATABASE_USER;

  static readonly password = process.env.DATABASE_PASSWORD;

  static readonly databaseName = process.env.DATABASE_NAME;
}
