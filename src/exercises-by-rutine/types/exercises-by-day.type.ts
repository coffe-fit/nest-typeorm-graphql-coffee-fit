import { Field, ObjectType } from '@nestjs/graphql';
import { ExercisesByRutineTypeType } from './exercises-by-rutineType.type';


@ObjectType('ExercisesByDay')
export class ExercisesByDay{
  @Field()
  day: Number;

  @Field(() => [ExercisesByRutineTypeType])
  rutineType: ExercisesByRutineTypeType[];

}