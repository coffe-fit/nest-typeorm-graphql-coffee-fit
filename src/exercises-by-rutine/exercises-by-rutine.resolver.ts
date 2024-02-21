import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ExercisesByRutineService } from './exercises-by-rutine.service';
import { CreateExercisesByRutineInput } from './dto/create-exercises-by-rutine.input';
import { UpdateExercisesByRutineInput } from './dto/update-exercises-by-rutine.input';
import { ExercisesByRutineType } from './types/exercises-by-rutine.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExercisesByRutine } from './entities/exercises-by-rutine.entity';

@Resolver(of => ExercisesByRutineType)
export class ExercisesByRutineResolver {
  constructor(private readonly exercisesByRutineService: ExercisesByRutineService) {}


  @Mutation(returns => ExercisesByRutineType)
  async exercisesByRutineType_create(@Args('createExercisesByRutineInput') createExercisesByRutineInput: CreateExercisesByRutineInput): Promise<ExercisesByRutine> {
    console.log(createExercisesByRutineInput);
    
    return this.exercisesByRutineService.createExercisesByRutineService(createExercisesByRutineInput);
  }

  @Query(returns => [ExercisesByRutineType])
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(FirebaseAuthGuard)
  async exercisesByRutineType_findAll(): Promise<ExercisesByRutine[]> {
    return this.exercisesByRutineService.getAllExercises();
  }

  // @Mutation('createExercisesByRutine')
  // create(@Args('createExercisesByRutineInput') createExercisesByRutineInput: CreateExercisesByRutineInput) {
  //   return this.exercisesByRutineService.create(createExercisesByRutineInput);
  // }

  // @Query('exercisesByRutine')
  // findAll() {
  //   return this.exercisesByRutineService.findAll();
  // }

  // @Query('exercisesByRutine')
  // findOne(@Args('id') id: number) {
  //   return this.exercisesByRutineService.findOne(id);
  // }

  // @Mutation('updateExercisesByRutine')
  // update(@Args('updateExercisesByRutineInput') updateExercisesByRutineInput: UpdateExercisesByRutineInput) {
  //   return this.exercisesByRutineService.update(updateExercisesByRutineInput.id, updateExercisesByRutineInput);
  // }

  // @Mutation('removeExercisesByRutine')
  // remove(@Args('id') id: number) {
  //   return this.exercisesByRutineService.remove(id);
  // }
}
