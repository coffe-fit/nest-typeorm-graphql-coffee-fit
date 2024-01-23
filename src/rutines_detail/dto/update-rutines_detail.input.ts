import { Field, InputType } from '@nestjs/graphql';
import { CreateRutinesDetailInput } from './create-rutines_detail.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsUUID, ValidateIf } from 'class-validator';

@InputType()
export class UpdateRutinesDetailInput extends PartialType(CreateRutinesDetailInput) {
  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  frequency: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  amountMax: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  intensity: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  frequencyCardiac: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  pulsation: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  seriesRange: string;

  @Field({nullable: true})
  @IsUUID()
  @ValidateIf((object,value) => value === null)
  rutineId?: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  rest: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  days: string;

  @Field({nullable: true})
  @IsString()
  @ValidateIf((object,value) => value === null)
  obs: string;
}
