import { Module } from '@nestjs/common';
import { RutinesTypeService } from './rutines_type.service';
import { RutinesTypeResolver } from './rutines_type.resolver';
import { RutinesType } from './entities/rutines_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([RutinesType])
  ],
  providers: [RutinesTypeResolver, RutinesTypeService],
})
export class RutinesTypeModule {}
