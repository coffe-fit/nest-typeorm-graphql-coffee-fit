// export class CreateExerciseInput {}
// exercise.graphql.dto.ts

import { Field, InputType } from '@nestjs/graphql';
import {  IsArray, IsBoolean, IsOptional, IsString, IsUUID, IsUrl, ValidateIf } from 'class-validator';

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
  movie: string;

  @Field(() => [String])
  @IsArray()
  metrics: string[];

  @Field()
  @IsUUID()
  rutineTypeId: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsUrl()
  imgBad?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsUrl()
  movie2?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  active?: boolean;

  @IsOptional()
  @Field({ nullable: true })
  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  activeByCompany?: boolean;
}
