// export class CreateExerciseInput {}
// exercise.graphql.dto.ts

import { Field, InputType } from '@nestjs/graphql';
import {  IsBoolean, IsString, IsUUID, IsUrl, ValidateIf } from 'class-validator';

@InputType()
export class CreateExerciseInput {
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
  @IsUrl()
  movie: string;

  @Field()
  @IsUUID()
  userCreatorId: string;

  @Field({ nullable: true })
  @IsBoolean()
  @ValidateIf((object,value) => value !== null)
  active?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @ValidateIf((object,value) => value !== null)
  activeByCompany?: boolean;
}
