import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateProgressInput {
   
  @Field()
  @IsString()
  bodyIndex: string;
   
  @Field()
  @IsString()
  measurement: string;
   
  @Field()
  @IsString()
  obs: string;

  @Field()
  @IsUUID()
  userId: string;
   
  @Field()
  @IsNumber()
  weightByKilos: number;
}
