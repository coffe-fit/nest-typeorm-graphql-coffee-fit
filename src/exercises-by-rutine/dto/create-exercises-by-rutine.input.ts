import { Field, InputType, Int } from "@nestjs/graphql";
import { IsArray, IsNumber, IsString, IsUUID } from "class-validator";
@InputType()
export class CreateExercisesByRutineInput {



  @Field()
  @IsNumber()
  days: number;

  @Field(() => [Int])
  @IsArray()
  amountRepeat?: number[];
  
  @Field()
  @IsString()
  obs: string;
  
  @Field()
  @IsString()
  break: string;

  @Field()
  @IsNumber()
  series: number;
  
  @Field()
  @IsUUID()
  exerciseId: string;

  @Field()
  @IsUUID()
  rutineTypeId: string;

  @Field()
  @IsUUID()
  userId: string;

  @Field()
  @IsUUID()
  rutineId: string;

  @Field({ nullable: true })
  weightByKilos?: number;
}
