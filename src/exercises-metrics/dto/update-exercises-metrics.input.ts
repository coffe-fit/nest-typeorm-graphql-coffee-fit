import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateExercisesMetricInput } from './create-exercises-metrics.input';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateExercisesMetricInput extends PartialType(CreateExercisesMetricInput) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}