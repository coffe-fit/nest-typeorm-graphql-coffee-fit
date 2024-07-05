import { Exercise } from "src/exercises/entities/exercise.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity()
export class ExercisesMetrics {
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

  @Column('text' ,
  {
    unique: true
  })
  measure: string;

}

