import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@ObjectType('roles')
export class roleType {

  @Field({nullable: true})
  @IsString()
  id?: string;

  @Field()
  @IsBoolean()
  active: boolean;

  @Field()
  @IsString()
  name: string;
}