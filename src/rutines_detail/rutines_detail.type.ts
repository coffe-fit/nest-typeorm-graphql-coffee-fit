import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { Rutine } from 'src/rutines/entities/rutine.entity';
import { RutineType } from 'src/rutines/types/rutine.type';

@ObjectType('rutines_detail')
export class RutinesDetailType {
  @Field()
  @IsString()
  id: string;

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
  @IsString()
  rest: string;

  @Field()
  @IsString()
  days: string;

  @Field()
  @IsString()
  obs: string;

  @Field(() => RutineType)
  rutine?: RutineType;
}