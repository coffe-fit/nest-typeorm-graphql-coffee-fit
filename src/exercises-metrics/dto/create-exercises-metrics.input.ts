import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateExercisesMetricInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsBoolean()
  active?: boolean;
  
  @Field(() => [String])
  @IsUUID()
  rutineType: String[];

  @Field(() => [String])
  @IsArray()
  metrics: String[];
}