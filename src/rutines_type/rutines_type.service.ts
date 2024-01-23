import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutinesTypeInput } from './dto/create-rutines_type.input';
import { UpdateRutinesTypeInput } from './dto/update-rutines_type.input';
import { InjectRepository } from '@nestjs/typeorm';
import { RutinesType } from './entities/rutines_type.entity';
import { Repository } from 'typeorm';
import { deleteCode, updateCode } from 'src/utils';
@Injectable()
export class RutinesTypeService {
  constructor(
    @InjectRepository(RutinesType) private readonly rutineTypeRepository: Repository<RutinesType>,
  ) {}

  async createRoutineType(createRoutineTypeDto: CreateRutinesTypeInput): Promise<RutinesType> {
    const routineType = this.rutineTypeRepository.create(createRoutineTypeDto);
    return await this.rutineTypeRepository.save(routineType);
  }

  async getAllRoutineType(): Promise<RutinesType[]> {
    return await this.rutineTypeRepository.find();
  }

  async getRoutineTypeById(id: string): Promise<RutinesType> {
    const routineType = await this.rutineTypeRepository.findOne( {
      where: {id},
      relations: ['routines'] });

    if (!routineType) {
      throw new NotFoundException(`RoutineType with ID ${id} not found`);
    }

    return routineType;
  }
  
  async updateRoutineType(routineTypeId: string, updateRutinesTypeInput: UpdateRutinesTypeInput): Promise<RutinesType> {
    let { ...toUpdate } = updateRutinesTypeInput;
    const routineType = await updateCode(
      routineTypeId,
      toUpdate,
      this.rutineTypeRepository
    );
    return this.rutineTypeRepository.save(routineType);
  }

  async deleteRoutineType(routineTypeId: string): Promise<void> {
    await deleteCode(routineTypeId, this.rutineTypeRepository)
  }
}
