import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { UsersType } from "src/users/types/users.type";

@ObjectType('progress')
export class ProgressType {
  @Field({
    nullable: true})
  id?: string;
  
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

  
  @Field()
  @IsOptional()
  @IsString()
  leftBicep?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  rightLeg?: string;

  @IsOptional()
  @IsString()
  leftLeg?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  chest?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  rightCalf?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  leftCalf?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  waist?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  rightForearm?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  leftForearm?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  diet?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  height?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  age?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  bodyFatPercentage?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  muscleMass?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  restingHeartRate?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  bloodPressure?: string;

  @IsOptional()
  @IsString()
  endurance?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  flexibility?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  strengthLevel?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  injuryHistory?: string;

  
  @Field()
  @IsOptional()
  @IsString()
  fitnessGoals?: string;
   
  @Field()
  @IsString()
  obs: string;

  @Field(() => UsersType)
  user: UsersType;
}