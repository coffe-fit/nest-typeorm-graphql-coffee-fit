

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
    defaultValue: 'M'
  })
  @IsString()
  @IsIn(['M', 'F', 'KID', 'UNISEX'])
  gender: string;

  @Field({
    nullable: true,
    defaultValue: ''
  })
  @IsString()
  phone?: string;

  @Field({
    nullable: true,
    defaultValue: 'baecbd4e-0e2c-4596-b4ee-7e9f35623a7d'
  })
  @IsString()
  roleId?: string;
  
  @Field({
    nullable: true,
    defaultValue: ''
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password?: string;

  @Field({
    nullable: true,
    defaultValue: ''
  })
  @IsString()
  username?: string;

}
