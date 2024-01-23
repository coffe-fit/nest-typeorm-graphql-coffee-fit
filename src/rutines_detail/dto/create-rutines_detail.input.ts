import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateRutinesDetailInput {
  @Field()
  @IsString()
  frequency: string;

  @Field()
  @IsString()
  amountMax: string;

  @Field()
  @IsString()
  intensity: string;

  @Field()
  @IsString()
  frequencyCardiac: string;

  @Field()
  @IsString()
  pulsation: string;

  @Field()
  @IsString()
  seriesRange: string;

  @Field()
  @IsUUID()
  rutineId: string;

  @Field()
  @IsString()
  rest: string;

  @Field()
  @IsString()
  days: string;

  @Field()
  @IsString()
  obs: string;
}