import { Field, InputType } from '@nestjs/graphql';
import { CreateRutineInput } from './create-rutine.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNumber, IsString, IsUUID, IsUrl, ValidateIf } from 'class-validator';

@InputType()
export class UpdateRutineInput extends PartialType(CreateRutineInput) {
  

  @Field({nullable: true})
  @IsNumber()
  @ValidateIf((object,value) => value === null)
  amountRepeat?: number;
  
  @Field({nullable: true})
  @IsUUID()
  @ValidateIf((object,value) => value === null)
  companyId?: string;

  @Field({nullable: true})
  @IsDate({strict: true} as any)
  @ValidateIf((object,value) => value === null)
  dateIni?: Date;

  @Field({nullable: true})
  @IsDate({strict: true} as any)
  @ValidateIf((object,value) => value === null)
  dateEnd?: Date;

  @Field({nullable: true})
  @IsNumber()
  @ValidateIf((object,value) => value === null)
  days?: number;
  
  @Field({nullable: true})
  @IsUUID()
  @ValidateIf((object,value) => value === null)
  exerciseId?: string;

  @Field({nullable: true})
  @IsUrl()
  @ValidateIf((object,value) => value === null)
  imgGood?: string;

  @Field({nullable: true})
  @IsUrl()
  @ValidateIf((object,value) => value === null)
  imgBad?: string;
  
  @Field({nullable: true})
  @IsString()
  obs: string;
  
  @Field({nullable: true})
  @IsUUID()
  @ValidateIf((object,value) => value === null)
  roleId1?: string;

  @Field({nullable: true})
  @IsUUID()
  @ValidateIf((object,value) => value === null)
  roleId2?: string;

  @Field({nullable: true})
  @IsUUID()
  @ValidateIf((object,value) => value === null)
  roleId3?: string;

  @Field({nullable: true})
  @IsUUID()
  @ValidateIf((object,value) => value === null)
  rutineTypeId?: string;
  
  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  names?: string;

  @Field({nullable: true})
  @IsNumber()
  @ValidateIf((object,value) => value === null)
  series?: number;

  @Field({nullable: true})
  @IsUUID()
  @ValidateIf((object,value) => value === null)
  userId?: string;
}
