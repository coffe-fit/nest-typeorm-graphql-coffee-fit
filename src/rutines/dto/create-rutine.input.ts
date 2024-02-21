import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

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
  @IsString()
  name?: string;

  @Field()
  @IsNumber()
  series?: number;

  @Field()
  @IsUUID()
  userId?: string;

}