import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@ObjectType('exercisesMetrics')
export class exercisesMetricsType {

  @Field({nullable: true})
  @IsString()
  id?: string;

  @Field()
  @IsBoolean()
  active: boolean;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  measure: string;
}