import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Rutine } from 'src/rutines/entities/rutine.entity';
import { RutinesModule } from 'src/rutines/rutines.module';

@Module({
  imports: [
    AuthModule,
    RutinesModule,
    TypeOrmModule.forFeature([
      User,
      Company,
      Role,
      Rutine
    ])
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
