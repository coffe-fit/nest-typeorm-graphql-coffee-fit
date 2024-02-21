import { CreateExercisesByRutineInput } from './create-exercises-by-rutine.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateExercisesByRutineInput extends PartialType(CreateExercisesByRutineInput) {
  id: number;
}
