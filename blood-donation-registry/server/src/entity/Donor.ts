import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Donation } from './Donation';
import {Gender} from '../../../src/app/models/dto'

@Entity()
export class Donor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
      type: 'enum',
      enum: Gender,
      default: Gender.Other
    })
    gender: string;

    @Column()
    citizenship: string;

    @Column()
    birthPlace: string;

    @Column({
      type: 'date'
    })
    birthDate: string;

    @Column()
    address: string;

    @Column({
      length: 9,
      unique: true
    })
    socialSecurity: string;

    @OneToMany(type => Donation, donation => donation.donor)
    donations: Donation[];

}

