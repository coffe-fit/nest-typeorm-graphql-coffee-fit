import { Field, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ObjectType('auth')
export class AuthType {

  @Field()
  @IsString()
  token: string;

  @Field()
  @IsString()
  id: string;
}