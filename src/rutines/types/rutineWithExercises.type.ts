import { Field, ObjectType } from '@nestjs/graphql';
import { ExercisesByRutineTypeType } from 'src/exercises-by-rutine/types/exercises-by-rutineType.type';
import { RutineType } from './rutine.type';


@ObjectType('rutineWithExercises')
export class RutineWithExercises{
  @Field(() => RutineType)
  rutine: RutineType

  @Field(() => [ExercisesByRutineTypeType])
  rutineType: ExercisesByRutineTypeType[];

}