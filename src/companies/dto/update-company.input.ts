import { Field, InputType } from '@nestjs/graphql';
import { CreateCompanyInput } from './create-company.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsUUID, IsUrl, ValidateIf } from 'class-validator';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @Field({nullable: true})
  active?: boolean;

  @Field({nullable: true})
  @IsString()
  address?: string;

  @Field({nullable: true})
  @IsString()
  @IsUUID()
  companyLead?: string;

  @Field({nullable: true})
  @IsString()
  @IsEmail()
  email?: string;

  @Field({nullable: true})
  @IsString()
  @IsUrl()
  logo: string;

  @Field({nullable: true})
  @IsString()
  name?: string;

  @Field({nullable: true})
  @IsString()
  nit?: string;

  @Field({nullable: true})
  @IsString()
  phone?: string;
}
