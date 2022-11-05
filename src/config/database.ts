import { createConnection } from "typeorm";
import { DataBaseEnvs } from "./envs/database-envs";
import { Service } from "typedi";
import * as path from "path";

@Service()
export class TypeOrmConnection {
  async connect(): Promise<void> {
    try {
      await createConnection({
        type: "postgres",
        host: <string>DataBaseEnvs.host,
        username: <string>DataBaseEnvs.username,
        password: <string>DataBaseEnvs.password,
        database: <string>DataBaseEnvs.databaseName,
        port: 5432,
        logging: false,
        entities: [
          path.resolve(__dirname, "..", "api", "entities", "*.{js,ts}"),
        ],
        //------configurações para conseguir conectar ao banco de dados na Heroku
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        //-----------------------------------------------------------------------
        synchronize: true,
      });
    } catch (e) {
      console.info("Erro ao conectar ao banco de dados:", e);
    }
  }
}
