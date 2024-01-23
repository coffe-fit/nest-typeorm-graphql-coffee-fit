// rutine.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';
import { Role } from '../../roles/entities/role.entity';
import { RutineDetail } from 'src/rutines_detail/entities/rutines_detail.entity';
import { RutinesType } from 'src/rutines_type/entities/rutines_type.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@Entity()
export class Rutine {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
    nullable: true
  })
  names: String;

  @Column()
  imgGood: String;

  @Column()
  imgBad: String;

  @Column({ type: 'timestamp' })
  dateIni: Date;

  @Column({ type: 'timestamp' })
  dateEnd: Date;

  @Column()
  days: Number;

  @Column()
  series: Number;

  @Column()
  amountRepeat: Number;

  @Column()
  obs: String;

  @ManyToOne(() => User, (user) => user.rutines)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Company, (company) => company.rutines)
  @JoinColumn()
  company: Company;

  @ManyToOne(() => Role, (role) => role.rutines1)
  @JoinColumn()
  role1: Role;

  @ManyToOne(() => Role, (role) => role.rutines2)
  @JoinColumn()
  role2: Role;

  @ManyToOne(() => Role, (role) => role.rutines3)
  @JoinColumn()
  role3: Role;

  @ManyToOne(() => Exercise, (exercise) => exercise.rutine)
  @JoinColumn()
  exercise: Exercise;

  @ManyToOne(() => RutinesType, (rutineType) => rutineType.rutines)
  @JoinColumn()
  rutineType: RutinesType;

  @OneToOne(() => RutineDetail, (rutineDetail) => rutineDetail.rutine, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  rutineDetail: RutineDetail;
}

