import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { RutineType } from './rutine.type';
import { Rutine } from '../entities/rutine.entity';
import { ExercisesByRutineType } from 'src/exercises-by-rutine/types/exercises-by-rutine.type';

@ObjectType('rutineOrderRutineType')
export class RutineOrderRutineType{
  @Field()
  rutineTypeName: string;

  @Field(() => [ExercisesByRutineType])
  exercises: ExercisesByRutineType[];

  @Field(() => [Float])
  days: number[];

  @Field({nullable: true})
  name: string;

  @Field()
  dateIni?: Date;

  @Field()
  dateEnd?: Date;

}