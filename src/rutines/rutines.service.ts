import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutineInput } from './dto/create-rutine.input';
import { Rutine } from './entities/rutine.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RutinesType } from 'src/rutines_type/entities/rutines_type.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { UpdateRutineInput } from './dto/update-rutine.input';
import { deleteCode, getDataById, updateCode, getDataByUserId } from 'src/utils';
import { RutineType } from './types/rutine.type';

@Injectable()
export class RutineService {
  constructor(
    @InjectRepository(RutinesType)
    private RutinesTypeRepository: Repository<RutinesType>,

    @InjectRepository(Rutine)
    private readonly RutineRepository: Repository<Rutine>,
  ) {}

  private relations = [
    'company',
    'rutineType',
    'user',
    'role1',
    'role2',
    'role3',
    'exercise',
    'user.company',
    'user.role',
    'rutineDetail'
  ];
  
  async createRutine(CreateRutineInput: CreateRutineInput): Promise<Rutine> {
    let {
      userId,
      companyId,
      exerciseId,
      rutineTypeId,
      roleId1,
      roleId2,
      roleId3
    } = CreateRutineInput;
    let rutineType = await getDataById(rutineTypeId, this.RutinesTypeRepository, );

    const Rutine = await this.RutineRepository.create({
      user: {id: userId} as User,
      company: {id: companyId} as Company,
      exercise: {id: exerciseId} as Exercise,
      role1: {id: roleId1} as Role,
      role2: {id: roleId2} as Role,
      role3: {id: roleId3} as Role,
      rutineType,
      ...CreateRutineInput
    });
    
    return this.RutineRepository.save(Rutine);
  }

  async getAllRutines(): Promise<Rutine[]> {
    return await this.RutineRepository.find({
      relations: this.relations
    });
  }

  async getRutineById(rutineId: string): Promise<Rutine> {
    const rutine = await getDataById(
      rutineId,
      this.RutineRepository,
      this.relations
      );
    return rutine;
  }

  async getAllRutinesByUserId(userId: string): Promise<{ rutineTypeId: string; rutines:any}[]> {
    const rutine = await this.RutineRepository.find({
      where: {user: {id: userId} as User },
      relations: this.relations
    }) 
    
    const result: { rutineTypeId: any, rutines: Rutine[] }[] = [];

    // // Obtener RutineTipeId únicos
    const uniqueTypeIds = [...new Set(rutine.map(item => {
      if (item.rutineType !== null) {
        return item.rutineType?.id
      }
    }))];

    // Iterar sobre cada RutineTipeId único
    uniqueTypeIds.forEach(typeId => {
      // Filtrar elementos por RutineTipeId y agregar al resultado
      const filteredItems = rutine.filter(item => item.rutineType && item.rutineType?.id === typeId);
      result.push({ rutineTypeId: typeId, rutines: filteredItems });
    });
    return result
  }

  async updateRutine(rutineId: string, updateRutineInput: UpdateRutineInput): Promise<Rutine> {
    let { ...toUpdate } = updateRutineInput;
    const rutine = await updateCode(
      rutineId,
      toUpdate,
      this.RutineRepository
    );
    return this.RutineRepository.save(rutine);
  }

  async deleteRutine(rutineId: string): Promise<void> {
    await deleteCode(rutineId, this.RutineRepository);
  }
}
