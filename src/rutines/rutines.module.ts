import { Module } from '@nestjs/common';
import { RutineService } from './rutines.service';
import { RutinesResolver } from './rutines.resolver';
import { Rutine } from './entities/rutine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RutineDetail } from 'src/rutines_detail/entities/rutines_detail.entity';
import { RutinesType } from 'src/rutines_type/entities/rutines_type.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Rutine,
      RutinesType,
    ])
  ],
  providers: [RutinesResolver, RutineService],
})
export class RutinesModule {}
