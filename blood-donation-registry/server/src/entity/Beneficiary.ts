import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { SocialSecurityConstraint } from '../validator/SocialSecurityValidator';
import { Validate } from 'class-validator';
import { Donation } from './Donation';

@Entity()
export class Beneficiary {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
      length: 9,
      unique: true
    })
    @Validate(SocialSecurityConstraint)
    socialSecurity: string;

    @OneToMany( type => Donation, donation => donation.beneficiary)
    donations: Donation[];

}
