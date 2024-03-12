import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString, IsUUID } from "class-validator";
import { UsersType } from "src/users/types/users.type";

@ObjectType('progress')
export class ProgressType {
  @Field({
    nullable: true})
  id?: string;
   
  @Field()
  @IsString()
  measurement: string;
   
  @Field()
  @IsString()
  bodyIndex: string;
   
  @Field()
  @IsNumber()
  weightByKilos: number;

  @Field()
  @IsDate({strict: true} as any)
  dateCreated?: Date;
   
  @Field()
  @IsString()
  obs: string;

  @Field(() => UsersType)
  user: UsersType;
}