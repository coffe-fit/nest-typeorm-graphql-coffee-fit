import { IsBoolean, IsString, ValidateIf } from 'class-validator';
import { CreateRutinesTypeInput } from './create-rutines_type.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRutinesTypeInput extends PartialType(CreateRutinesTypeInput) {
  @Field({nullable: true})
  @IsBoolean()
  @ValidateIf((object,value) => value === null)
  active: boolean;
  
  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  name: string;
}
