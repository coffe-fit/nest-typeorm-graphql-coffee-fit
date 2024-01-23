import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CompanyType } from 'src/companies/company.type';
import { ExerciseType } from 'src/exercises/exercise.type';
import { roleType } from 'src/roles/role.type';
import { RutinesDetailType } from 'src/rutines_detail/rutines_detail.type';
import { RutinesTypeType } from 'src/rutines_type/rutines_type.type';
import { UsersType } from 'src/users/users.type';

@ObjectType('rutines')
export class RutineType{
  @Field({nullable: true})
  id?: string;

  @Field({nullable: true})
  names: string;

  @Field()
  imgGood?: string;

  @Field()
  imgBad?: string;

  @Field()
  @IsDateString()
  dateIni?: Date;

  @Field()
  @IsDateString()
  dateEnd?: Date;

  @Field()
  @IsDateString()
  days?: number;

  @Field()
  @IsNumber()
  series?: number;

  @Field()
  @IsNumber()
  amountRepeat?: number;
  
  @Field()
  obs: string;

  @Field(() => UsersType)
  user?: UsersType;

  @Field(() => roleType)
  role1?: roleType;

  @Field(() => roleType)
  role2?: roleType;

  @Field(() => roleType)
  role3?: roleType;
  
  @Field(() => CompanyType)
  company?: CompanyType;

  @Field(() => RutinesTypeType)
  rutineType?: RutinesTypeType;

  @Field(() => ExerciseType)
  exercise?: ExerciseType;

  @Field(() => RutinesDetailType)
  rutineDetail?: RutinesDetailType;
}