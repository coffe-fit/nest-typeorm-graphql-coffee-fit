import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateAuthInput {
  @Field()
  @IsEmail()
  email: String;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @Field({nullable: false})
  @IsString()
  foranyToken: String;
}
