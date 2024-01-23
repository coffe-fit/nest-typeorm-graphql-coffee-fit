import { Module } from '@nestjs/common';
import { ExerciseService } from './exercises.service';
import { ExercisesResolver } from './exercises.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Exercise])
  ],
  providers: [ExercisesResolver, ExerciseService],
})
export class ExercisesModule {}
