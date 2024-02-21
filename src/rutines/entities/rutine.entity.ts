// rutine.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';
import { Role } from '../../roles/entities/role.entity';
import { ExercisesByRutine } from 'src/exercises-by-rutine/entities/exercises-by-rutine.entity';

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
  name: String;

  @Column({ type: 'timestamp' })
  dateIni: Date;

  @Column({ type: 'timestamp' })
  dateEnd: Date;

  @Column()
  days: Number;

  @Column()
  obs: String;

  @Column({
    default: 0,
    nullable: true
  })
  frecuency: Number;

  @Column({
    default: true,
    nullable: true
  })
  active: Boolean;

  @Column({
    default: 0,
    nullable: true
  })
  intensity: Number;

  @Column({
    default: 0,
    nullable: true
  })
  maxDuration: Number;

  @Column({
    default: 0,
    nullable: true
  })
  cardiacFrec: Number;

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

  @OneToMany(() => ExercisesByRutine, (exercisesByRutine) => exercisesByRutine.rutine)
  exercisesByRutine?: ExercisesByRutine[];
}

