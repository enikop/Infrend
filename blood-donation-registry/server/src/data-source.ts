import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Donor } from './entity/Donor'
import { DonationCenter } from './entity/DonationCenter'
import { Donation } from './entity/Donation'
import { Beneficiary } from './entity/Beneficiary'
import { User } from './entity/User'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    database: 'blood_donation',
    synchronize: true,
    logging: false,
    entities: [Donor, DonationCenter, Donation, Beneficiary, User],
    migrations: [],
    subscribers: [],
})
