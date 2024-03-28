import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
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
    socialSecurity: string;

}
