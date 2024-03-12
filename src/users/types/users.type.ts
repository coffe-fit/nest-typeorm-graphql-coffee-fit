

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber} from 'class-validator';
import { CompanyType } from 'src/companies/company.type';
import { Role } from 'src/roles/entities/role.entity';
import { roleType } from 'src/roles/role.type';
import { RutineOrderRutineType } from 'src/rutines/types/rutineOrderRutine.type';



@ObjectType('Users')
export class UsersType {
  @Field({
    nullable: false,
    defaultValue: '' })
  @IsString()
  id?: string;

  @Field({nullable: false })
  @IsString()
  username: string;

  @Field({nullable: false})
  @IsString()
  document: string;

  @Field()
  @IsString()
  gender: String;

  @Field()
  @IsString()
  email: String;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsNumber()
  age?: number;

  @Field(() => roleType)
  role?: roleType;
  
  @Field(() => CompanyType)
  company?: CompanyType;
}
