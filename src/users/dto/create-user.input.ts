

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber, IsUUID, MinLength, MaxLength, Matches, IsIn, ValidateIf} from 'class-validator';



@InputType()
export class CreateUserInput {
  @Field({
    nullable: true,
    defaultValue: 0
  })
  @IsNumber()
  age?: number;

  @Field({
    nullable: true,
    defaultValue: '0001COF'
  })
  @IsString()
  companyId?: string;

  @Field({
    nullable: true,
    defaultValue: ''
  })
  @IsString()
  document: string;

  @Field()
  @IsString()
  email: string;

  @Field({
    nullable: true,
    defaultValue: 'MEN'
  })
  @IsString()
  @IsIn(['MEN', 'WOMEN', 'KID', 'UNISEX'])
  gender: string;

  @Field({
    nullable: true,
    defaultValue: ''
  })
  @IsString()
  phone: string;

  @Field({
    nullable: true,
    defaultValue: 'CLIENT'
  })
  @IsString()
  roleId: string;
  
  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @Field({
    nullable: true,
    defaultValue: ''
  })
  @IsString()
  username: string;

}
