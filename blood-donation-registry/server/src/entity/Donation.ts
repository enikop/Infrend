import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Beneficiary } from './Beneficiary';
import { Donor } from './Donor';
import { DonationCenter } from './DonationCenter';

@Entity()
export class Donation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => DonationCenter, center => center.donations, { onDelete: 'CASCADE' , eager: true})
    place: DonationCenter;

    @ManyToOne(type => Donor, donor => donor.donations, { onDelete: 'CASCADE', eager: true })
    donor: Donor;

    @Column({
      type: 'date',
      default: () => '(CURRENT_DATE())'
    })
    date: string;

    @Column()
    eligible: boolean;

    @Column({
      nullable: true,
    })
    reason: string;

    @Column()
    doctor: string;

    @Column()
    directed: boolean;

    @ManyToOne(type => Beneficiary, beneficiary => beneficiary.donations, {onDelete: 'CASCADE', eager: true})
    beneficiary: Beneficiary;


}
