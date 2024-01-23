import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsNumber, IsString, ValidateIf } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({nullable: false })
  @IsString()
  @ValidateIf((object,value) => value === null)
  username?: string;

  @Field({nullable: false})
  @IsString()
  @ValidateIf((object,value) => value === null)
  document?: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  gender?: string;

  @Field({nullable: true})
  @IsEmail()
  @ValidateIf((object,value) => value === null)
  email?: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  phone?: string;

  @Field({nullable: true})
  @IsNumber()
  @ValidateIf((object,value) => value === null)
  age?: number;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  roleId?: string;

  @Field({nullable: true })
  @IsBoolean()
  @ValidateIf((object,value) => value === null)
  active?: boolean;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  companyId?: string;
}


