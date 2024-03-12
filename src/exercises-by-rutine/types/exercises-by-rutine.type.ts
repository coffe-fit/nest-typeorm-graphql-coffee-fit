import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsDate, IsNumber, IsString, IsUUID } from "class-validator";
import { ExerciseType } from "src/exercises/exercise.type";
import { RutineType } from "src/rutines/types/rutine.type";
import { RutinesTypeType } from "src/rutines_type/rutines_type.type";
import { UsersType } from "src/users/types/users.type";

@ObjectType('exerciseByRutine')
export class ExercisesByRutineType {
  @Field({
    nullable: true})
  id?: String;
   
  @Field()
  @IsNumber()
  days: Number;
   
  @Field()
  @IsNumber()
  series: Number;
   
  @Field(() => [Int])
  @IsArray()
  amountRepeat: Number[];

  @Field()
  @IsNumber()
  weightByKilos?: Number;
   
  @Field()
  @IsString()
  break: String;
   
  @Field(() => [Int])
  @IsArray()
  amountRepeatMax: Number[];
   
  @Field()
  @IsNumber()
  weightByKilosMax: Number;

  @Field()
  @IsString()
  obs: String;

  @Field(() => RutineType)
  rutine: RutineType;

  @Field(() => ExerciseType)
  exercise: ExerciseType;

  @Field(() => UsersType)
  user: UsersType;

  @Field(() => RutinesTypeType)
  rutineType: RutinesTypeType;
}