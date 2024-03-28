import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Donation } from "./Donation";

@Entity()
export class DonationCenter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    isActive: boolean;

    @OneToMany(type => Donation, donation => donation.place, { cascade: true })
    donations: Donation[];


}

