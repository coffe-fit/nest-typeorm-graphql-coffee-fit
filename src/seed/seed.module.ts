import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { RutinesType } from 'src/rutines_type/entities/rutines_type.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [
    TypeOrmModule.forFeature([
      Role,
      User,
      RutinesType,
      Exercise,
      Company
    ]),
  ],
})
export class SeedModule {}
