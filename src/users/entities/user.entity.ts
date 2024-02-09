
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Company } from "src/companies/entities/company.entity";
import { Role } from "src/roles/entities/role.entity";
import { Rutine } from "src/rutines/entities/rutine.entity";
import { Exercise } from "src/exercises/entities/exercise.entity";
import { Progress } from "src/progress/entities/progress.entity";
import { Auth } from "src/auth/entities/auth.entity";

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column('bool',{
    default: true,
  })
  active?: Boolean;

  @Column('text',
    {default: ''}
  )
  username: string;

  @Column('text', {
    default: '',
  })
  document: string;

  @Column('text',
  {default: 'MEN'}
  )
  gender: string;

  @Column('text',
    {unique: true}
  )
  email: string;

  @Column('text', {
    default: '',
  })
  phone?: string;

  @Column('int',{
    default: 0,
  })
  age?: Number;

  @Column('text')
  date_register: string;

  @Column(
    {select:  false,
      type: 'text',
      default: '',
      nullable: true}
  )
  password: string;

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;

  @ManyToOne(() => Role, (role) => role.users, {
    cascade: true,
    eager: true,
  })
  role: Role;

  @OneToMany(() => Rutine, (rutine) => rutine.user)
  rutines?: Rutine[];
  
  @OneToMany(() => Exercise, (exercise) => exercise.userCreator)
  exercise?: Exercise[];

  @OneToMany(() => Progress, (progress) => progress.user)
  progress?: Progress[];

  @OneToMany(() => Auth, (auth) => auth.user)
  auth?: Auth[];

  @BeforeInsert()
  checkUserInsert() {
    this.email = this.email
      .toLowerCase()
      .trim()
  }

  @BeforeUpdate()
  checkUserUpdate() {
    this.checkUserInsert();
  }
}
