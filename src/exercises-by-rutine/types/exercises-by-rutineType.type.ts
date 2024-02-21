import { Field, ObjectType } from '@nestjs/graphql';
import { ExercisesByRutineType } from './exercises-by-rutine.type';


@ObjectType('exercisesByRutineTypeType')
export class ExercisesByRutineTypeType {
  @Field()
  rutineTypeName: string;

  @Field(() => [ExercisesByRutineType])
  exercises: ExercisesByRutineType[];
}