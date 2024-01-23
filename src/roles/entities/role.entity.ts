import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "src/users/entities/user.entity";
import { Rutine } from "src/rutines/entities/rutine.entity";
import { Exercise } from "src/exercises/entities/exercise.entity";

@Entity()
export class Role {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'bool',
    default: true,
    nullable: true
  })
  active: Boolean;

  @Column('text' ,
  {
    unique: true
  })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => Exercise, (exercise) => exercise.role)
  exercise: Exercise[];

  @OneToMany(() => Rutine, (rutine) => rutine.role1)
  rutines1: Rutine[];

  @OneToMany(() => Rutine, (rutine) => rutine.role2)
  rutines2: Rutine[];

  @OneToMany(() => Rutine, (rutine) => rutine.role3)
  rutines3: Rutine[];

  // rutines1: string
}
