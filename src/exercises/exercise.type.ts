// export class CreateExerciseInput {}
// exercise.graphql.dto.ts

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsString, IsUrl, ValidateIf } from 'class-validator';
import { exercisesMetricsType } from 'src/exercises-metrics/exercises-metrics.type';
import { RutinesTypeType } from 'src/rutines_type/rutines_type.type';
import { UsersType } from 'src/users/types/users.type';

@ObjectType('exercises')
export class ExerciseType {
  @Field(() => ID)
  id: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsUrl()
  imgGood: string;

  @Field()
  @IsUrl()
  imgBad: string;

  @Field()
  @IsBoolean()
  active: boolean;


  @Field()
  @IsUrl()
  movie: string;

  @Field()
  @IsUrl()
  movie2: string;

  @Field()
  activeByCompany: boolean;

  @Field(() => UsersType)
  userCreator?: UsersType;

  @Field(() => RutinesTypeType)
  rutineType?: RutinesTypeType;

  @Field(() => [String])
  @IsArray()
  metrics: string[];
  

  // Otros campos necesarios para un ejercicio
}
