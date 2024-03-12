import { Field, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsNumber } from 'class-validator';
import { CompanyType } from 'src/companies/company.type';
import { ExercisesByRutineType } from 'src/exercises-by-rutine/types/exercises-by-rutine.type';
import { roleType } from 'src/roles/role.type';
import { UsersType } from 'src/users/types/users.type';

@ObjectType('rutines')
export class RutineType{
  @Field({nullable: true})
  id?: string;

  @Field({nullable: true})
  name: string;

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
  obs: string;
  
  @Field()
  active: boolean;

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
  
  @Field(() => ExercisesByRutineType)
  exercisesByRutine?: ExercisesByRutineType;
}