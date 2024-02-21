import { Field, ObjectType } from '@nestjs/graphql';
import { ExercisesByRutineTypeType } from 'src/exercises-by-rutine/types/exercises-by-rutineType.type';


@ObjectType('rutineOrderDaysType')
export class RutineOrderDaysType{
  @Field()
  day: Number;

  @Field(() => [ExercisesByRutineTypeType])
  rutineType: ExercisesByRutineTypeType[];

}