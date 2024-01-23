import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRutinesTypeInput {
  @Field()
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}