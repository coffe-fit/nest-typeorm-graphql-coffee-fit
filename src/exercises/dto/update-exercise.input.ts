
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsUrl, ValidateIf } from 'class-validator';
import { UsersType } from 'src/users/types/users.type';
import { CreateExerciseInput } from './create-exercise.input';

@InputType()
export class UpdateExerciseInput extends PartialType(CreateExerciseInput)  {

}