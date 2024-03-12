import { Module } from '@nestjs/common';
import { ExercisesByRutineService } from './exercises-by-rutine.service';
import { ExercisesByRutineResolver } from './exercises-by-rutine.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { Rutine } from 'src/rutines/entities/rutine.entity';
import { RutinesType } from 'src/rutines_type/entities/rutines_type.entity';
import { ExercisesByRutine } from './entities/exercises-by-rutine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersType } from 'src/users/types/users.type';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ExercisesByRutine,
      Rutine,
      RutinesType,
      UsersType
    ])
  ],
  providers: [ExercisesByRutineResolver, ExercisesByRutineService],
})
export class ExercisesByRutineModule {}
