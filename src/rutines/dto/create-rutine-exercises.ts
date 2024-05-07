import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateRutineInput } from "./create-rutine.input";
import { IsArray, IsDate, IsNumber, IsOptional, IsString, IsUUID, ValidateIf } from "class-validator";

@InputType()
export class ExerciseInput {
  
  @Field(() => [Int])
  @IsArray()
  amountRepeat?: Number[];

  @Field()
  @IsNumber()
  series?: number;
  ///////////////////
  @Field()
  @IsString()
  break: string


  @Field()
  @IsNumber()
  weightByKilos?: Number;

  @Field(() => [Int])
  @IsArray()
  amountRepeatMax?: Number[];
   
  @Field()
  @IsNumber()
  weightByKilosMax?: Number;

  @Field()
  @IsUUID("4")
  exerciseId: string;

  @Field()
  @IsUUID("4")
  rutineTypeId: string;

  @Field()
  @IsNumber()
  days: number;
}

@InputType()
export class CreateRutineWithExercisesInput {
  
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

  @Field({nullable: true})
  @IsUUID(4, { each: true })
  @IsOptional()
  roleId2?: string;

  @Field({nullable: true})
  @IsUUID(4, { each: true })
  @IsOptional()
  roleId3?: string;
  
  @Field()
  @IsString()
  name?: string;

  @Field(() => [ExerciseInput])
  @IsArray()
  exercises: ExerciseInput[];


  @Field({nullable: true})
  @IsUUID(4, { each: true })
  @IsOptional()
  companyId?: string;

  @Field()
  @IsUUID()
  userId?: string;
}