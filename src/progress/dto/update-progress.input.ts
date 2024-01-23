import { Field, InputType } from '@nestjs/graphql';
import { CreateProgressInput } from './create-progress.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateProgressInput extends PartialType(CreateProgressInput) {
   
  @Field({nullable: true})
  @IsString()
  bodyIndex?: string;

  @Field({nullable: true})
  @IsString()
  measurement?: string;
   
  @Field({nullable: true})
  @IsNumber()
  weightByKilos?: number;
   
  @Field({nullable: true})
  @IsString()
  obs?: string;
}
