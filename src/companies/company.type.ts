// company.graphql.dto.ts

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType('companies')
export class CompanyType {
  @Field()
  @IsString()
  id?: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  companyLead: string;


  @Field()
  active: boolean;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsString()
  nit: string;

  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  logo: string;
}
