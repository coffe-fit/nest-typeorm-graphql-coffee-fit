import { Field, InputType } from '@nestjs/graphql';
import { CreateProgressInput } from './create-progress.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateProgressInput extends PartialType(CreateProgressInput) {

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  weight?: string;

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  rightShoulder?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  leftShoulder?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  rightBicep?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  leftBicep?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  rightLeg?: string;

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  leftLeg?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  chest?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  rightCalf?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  leftCalf?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  waist?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  rightForearm?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  leftForearm?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  diet?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  height?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  age?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  bodyFatPercentage?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  muscleMass?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  restingHeartRate?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  bloodPressure?: string;

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  endurance?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  flexibility?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  strengthLevel?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  injuryHistory?: string;

  
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  fitnessGoals?: string;
   
  @Field({nullable: true})
  @IsOptional()
  @IsString()
  obs: string;
}
