import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class AuthForanyToken {
  @Field()
  @IsEmail()
  email: String;

  @Field()
  @IsString()
  foranyToken: String;

  @Field({nullable: true, defaultValue: ''})
  @IsString()
  username: String;
}