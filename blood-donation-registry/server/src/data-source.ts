import "reflect-metadata"
import { DataSource } from "typeorm"
import { Donor } from "./entity/Donor"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "blood_donation",
    synchronize: true,
    logging: true,
    entities: [Donor],
    migrations: [],
    subscribers: [],
})
