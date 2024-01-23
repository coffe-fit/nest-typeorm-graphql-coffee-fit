import { Module } from '@nestjs/common';
import { RutinesDetailService } from './rutines_detail.service';
import { RutinesDetailResolver } from './rutines_detail.resolver';
import { RutineDetail } from './entities/rutines_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutine } from 'src/rutines/entities/rutine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RutineDetail,
      Rutine
    ])
  ],
  providers: [RutinesDetailResolver, RutinesDetailService],
})
export class RutinesDetailModule {}
