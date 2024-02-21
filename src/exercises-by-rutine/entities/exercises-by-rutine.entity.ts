import { Exercise } from "src/exercises/entities/exercise.entity";
import { Rutine } from "src/rutines/entities/rutine.entity";
import { RutinesType } from "src/rutines_type/entities/rutines_type.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExercisesByRutine {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  days: Number;

  @Column()
  series: Number;

  @Column("int", { array: true })
  amountRepeat: Number[];

  @Column({
    default: 0,
    nullable: true
  })
  weightByKilos?: Number;

  @Column("int", {
    default: null,
    nullable: true,
    array: true 
  })
  amountRepeatMax: Number[];

  @Column({
    default: 0,
    nullable: true
  })
  weightByKilosMax: Number;

  @Column()
  obs: String;

  @Column()
  break: String;

  @ManyToOne(() => User, (user) => user.exercisesByRutine)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.exercisesByRutine)
  @JoinColumn()
  exercise: Exercise;

  @ManyToOne(() => RutinesType, (rutineType) => rutineType.exercisesByRutine)
  @JoinColumn()
  rutineType: RutinesType;

  @ManyToOne(() => Rutine, (rutine) => rutine.exercisesByRutine)
  @JoinColumn()
  rutine: Rutine;
}

