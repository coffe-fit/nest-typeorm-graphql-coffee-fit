import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExerciseService } from './exercises.service';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { Exercise } from './entities/exercise.entity';
import { ExerciseType } from './exercise.type';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserGuard } from '../auth/guards/active-user.guard';
import { FirebaseAuthGuard } from '../auth/decorators/firebase.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(of => ExerciseType)
export class ExercisesResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(returns => ExerciseType)
  async exercise_create(@Args('createExerciseInput') createExerciseInput: CreateExerciseInput): Promise<Exercise> {
    return this.exerciseService.createExercise(createExerciseInput);
  }

  @Query(returns => [ExerciseType])
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(FirebaseAuthGuard)
  async exercise_findAll(): Promise<Exercise[]> {
    return this.exerciseService.getAllExercises();
  }

  @Query(returns => ExerciseType)
  async exercise_findById(@Args('exerciseId') id: string): Promise<Exercise | undefined> {
    return this.exerciseService.getExerciseById(id);
  }

  @Mutation(returns => ExerciseType)
  async exercise_update(
    @Args('exerciseId') id: string,
    @Args('updateExerciseInput') updateExerciseInput: UpdateExerciseInput,
  ) {
    return this.exerciseService.updateExercise(id, updateExerciseInput);
  }

  @Mutation(returns => ExerciseType)
  async exercise_delete(@Args('exerciseId') id: string): Promise<void> {
    return this.exerciseService.deleteExercise(id);
  }
}
