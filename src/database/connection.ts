import { DataSource } from "typeorm";
import { Entities } from "./entities/sync.models";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    synchronize: true,
    logging: false,
    entities: Entities,
    subscribers: [],
    migrations: [],
});