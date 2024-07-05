import { Module } from '@nestjs/common';
import { ExercisesMetricsService } from './exercises-metrics.service';
import { ExercisesMetricsResolver } from './exercises-metrics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesMetrics } from './entities/exercises-metrics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExercisesMetrics])
  ],
  providers: [ExercisesMetricsResolver, ExercisesMetricsService],
})
export class ExercisesMetricsModule {}
