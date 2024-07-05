import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExercisesMetricsService } from './exercises-metrics.service';
import { CreateExercisesMetricInput } from './dto/create-exercises-metrics.input';
import { UpdateExercisesMetricInput } from './dto/update-exercises-metrics.input';
import { exercisesMetricsType } from './exercises-metrics.type'; // Asegúrate de que este es el nombre correcto del tipo
import { ExercisesMetrics } from './entities/exercises-metrics.entity';

@Resolver(of => exercisesMetricsType)
export class ExercisesMetricsResolver {
  constructor(private readonly exercisesMetricsService: ExercisesMetricsService) {}

  // @Mutation(returns => ExercisesMetricsType)
  // async createExerciseMetric(
  //   @Args('createExercisesMetricInput') createExercisesMetricInput: CreateExercisesMetricInput,
  // ): Promise<ExercisesMetricsType> {
  //   return this.exercisesMetricsService.create(createExercisesMetricInput);
  // }

  @Query(returns => [exercisesMetricsType])
  async exercisesMetrics_findAll(): Promise<ExercisesMetrics[]> {
    return this.exercisesMetricsService.findAll();
  }

  // @Query(returns => ExercisesMetricsType)
  // async findExerciseMetricById(@Args('id') id: string): Promise<ExercisesMetricsType> {
  //   return this.exercisesMetricsService.findById(id);
  // }

  // @Mutation(returns => ExercisesMetricsType)
  // async updateExerciseMetric(
  //   @Args('id') id: string,
  //   @Args('updateExercisesMetricInput') updateExercisesMetricInput: UpdateExercisesMetricInput,
  // ): Promise<ExercisesMetricsType> {
  //   return this.exercisesMetricsService.update(id, updateExercisesMetricInput);
  // }

  // @Mutation(returns => Boolean)
  // async deleteExerciseMetric(@Args('id') id: string): Promise<boolean> {
  //   return this.exercisesMetricsService.delete(id);
  // }
}