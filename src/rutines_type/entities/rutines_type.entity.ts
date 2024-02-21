import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Rutine } from "src/rutines/entities/rutine.entity";
import { ExercisesByRutine } from "src/exercises-by-rutine/entities/exercises-by-rutine.entity";

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
}
