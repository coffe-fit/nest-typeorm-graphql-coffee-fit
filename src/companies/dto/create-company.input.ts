// company.graphql.dto.ts

import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsString,
  IsUUID,
  IsUrl,
  ValidateIf
} from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field({nullable: true, defaultValue: true})
  @IsBoolean()
  active?: boolean;

  @Field()
  @IsString()
  address: string;

  @Field({
    nullable: true,
    defaultValue: '' })
  @IsUUID()
  @ValidateIf((object,value) => value !== '')
  companyLead: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsUrl()
  logo: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  nameId: string;

  @Field()
  @IsString()
  nit: string;

  @Field()
  @IsString()
  phone: string;
}
