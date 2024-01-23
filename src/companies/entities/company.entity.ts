import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "src/users/entities/user.entity";
import { Rutine } from "src/rutines/entities/rutine.entity";

@Entity()
export class Company {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column('text')
  name: String;

  @Column('text')
  active: Boolean;

  @Column('text')
  nit: String;

  @Column('text')
  phone: String;

  @Column('text')
  address: String;

  @Column('text')
  email: String;

  @Column('text')
  logo: String;

  @Column({
    type: 'varchar',
    length: 100,
    default: '',
  })
  companyLead: String;

  @Column({
    unique: true, 
    type: 'text',
  })
  nameId: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];
  
  @OneToMany(() => Rutine, (rutine) => rutine.company)
  rutines: Rutine[];

  // @OneToMany(() => Rutine, (rutine) => rutine.company)
  // rutines: String;
}
