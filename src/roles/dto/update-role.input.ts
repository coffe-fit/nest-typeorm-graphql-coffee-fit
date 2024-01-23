import { Field, InputType } from '@nestjs/graphql';
import { CreateRoleInput } from './create-role.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, ValidateIf } from 'class-validator';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field({nullable: true})
  @IsBoolean()
  @ValidateIf((object,value) => value === null)
  active: boolean;

  @Field({nullable: true})
  @IsString()
  name: string;
}
