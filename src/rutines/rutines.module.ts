import { Module } from '@nestjs/common';
import { RutineService } from './rutines.service';
import { RutinesResolver } from './rutines.resolver';
import { Rutine } from './entities/rutine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutinesType } from 'src/rutines_type/entities/rutines_type.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ExercisesByRutine } from 'src/exercises-by-rutine/entities/exercises-by-rutine.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Rutine,
      RutinesType,
      ExercisesByRutine
    ])
  ],
  providers: [RutinesResolver, RutineService],
})
export class RutinesModule {}
