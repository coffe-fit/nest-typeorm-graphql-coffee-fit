import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ExercisesByRutine } from "src/exercises-by-rutine/entities/exercises-by-rutine.entity";
import { Exercise } from "src/exercises/entities/exercise.entity";

@Entity()
export class RutinesType {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column('text')
  active: Boolean;

  @Column('text')
  name: String;
  
  @OneToMany(() => ExercisesByRutine, (exercisesByRutine) => exercisesByRutine.rutineType)
  exercisesByRutine?: ExercisesByRutine[];
  
  @OneToMany(() => Exercise, (exercises) => exercises.rutineType)
  exercises?: Exercise[];
}
