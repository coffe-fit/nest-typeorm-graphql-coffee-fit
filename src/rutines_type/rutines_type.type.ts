import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@ObjectType('rutinesType')
export class RutinesTypeType {
  @Field()
  @IsString()
  id?: string;

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}