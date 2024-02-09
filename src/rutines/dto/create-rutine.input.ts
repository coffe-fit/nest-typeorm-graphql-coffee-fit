import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID, IsUrl } from 'class-validator';
import { CompanyType } from 'src/companies/company.type';
import { roleType } from 'src/roles/role.type';
import { RutineType } from '../types/rutine.type';
import { CreateRutinesDetailInput } from 'src/rutines_detail/dto/create-rutines_detail.input';

@InputType()
export class CreateRutineInput {

  @Field()
  @IsNumber()
  amountRepeat?: number;
  
  @Field()
  @IsUUID()
  companyId?: string;

  @Field()
  @IsDate({strict: true} as any)
  dateIni?: Date;

  @Field()
  @IsDate({strict: true} as any)
  dateEnd?: Date;

  @Field()
  @IsNumber()
  days?: number;
  
  @Field()
  @IsUUID()
  exerciseId?: string;

  @Field()
  @IsUrl()
  imgGood?: string;

  @Field()
  @IsUrl()
  imgBad?: string;
  
  @Field()
  @IsString()
  obs: string;
  
  @Field()
  @IsUUID()
  roleId1?: string;

  @Field()
  @IsUUID()
  roleId2?: string;

  @Field()
  @IsUUID()
  roleId3?: string;

  @Field()
  @IsUUID()
  rutineTypeId?: string;
  
  @Field()
  @IsString()
  names?: string;

  @Field()
  @IsNumber()
  series?: number;

  @Field()
  @IsUUID()
  userId?: string;

}