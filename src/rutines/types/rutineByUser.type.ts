import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RutineType } from './rutine.type';
import { Rutine } from '../entities/rutine.entity';

@ObjectType('rutinesByUser')
export class RutineByUserType{
  @Field()
  rutineTypeId: string;

  @Field(() => [RutineType])
  rutines: RutineType[];
}