import { Validate } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { SocialSecurityConstraint } from '../validator/SocialSecurityValidator';
import { Donation } from './Donation';

export enum Gender {
  Male = 'férfi',
  Female = 'nő',
  Other = 'egyéb'
}

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
    @Validate(SocialSecurityConstraint)
    socialSecurity: string;

    @OneToMany(type => Donation, donation => donation.donor)
    donations: Donation[];

}

