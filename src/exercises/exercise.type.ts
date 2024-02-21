// export class CreateExerciseInput {}
// exercise.graphql.dto.ts

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, IsUrl, ValidateIf } from 'class-validator';
import { UsersType } from 'src/users/users.type';

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
  activeByCompany: boolean;

  @Field(() => UsersType)
  userCreator?: UsersType;

  // Otros campos necesarios para un ejercicio
}
