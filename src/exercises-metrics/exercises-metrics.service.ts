import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExercisesMetrics } from './entities/exercises-metrics.entity';
import { CreateExercisesMetricInput } from './dto/create-exercises-metrics.input';
import { UpdateExercisesMetricInput } from './dto/update-exercises-metrics.input';

@Injectable()
export class ExercisesMetricsService {
  constructor(
    @InjectRepository(ExercisesMetrics)
    private exercisesMetricsRepository: Repository<ExercisesMetrics>,
  ) {}

  // async create(createExercisesMetricInput: CreateExercisesMetricInput): Promise<ExercisesMetric> {
  //   const newMetric = this.exercisesMetricsRepository.create(createExercisesMetricInput);
  //   return this.exercisesMetricsRepository.save(newMetric);
  // }

  async findAll(): Promise<ExercisesMetrics[]> {
    return await this.exercisesMetricsRepository.find();
  }

  // async findById(id: string): Promise<ExercisesMetric> {
  //   const metric = await this.exercisesMetricsRepository.findOne({ where: { id } });
  //   if (!metric) {
  //     throw new NotFoundException(`ExercisesMetric with ID ${id} not found`);
  //   }
  //   return metric;
  // }

  // async update(id: string, updateExercisesMetricInput: UpdateExercisesMetricInput): Promise<ExercisesMetric> {
  //   const metric = await this.findById(id);

  //   if (!metric) {
  //     throw new NotFoundException(`ExercisesMetric with ID ${id} not found`);
  //   }

  //   Object.assign(metric, updateExercisesMetricInput);
  //   return this.exercisesMetricsRepository.save(metric);
  // }

  // async delete(id: string): Promise<boolean> {
  //   const result = await this.exercisesMetricsRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`ExercisesMetric with ID ${id} not found`);
  //   }
  //   return true;
  // }
}
