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
import { ExercisesByRutine } from 'src/exercises-by-rutine/entities/exercises-by-rutine.entity';
import { ExercisesByDay } from 'src/exercises-by-rutine/types/exercises-by-day.type';
import { RutineWithExercises } from './types/rutineWithExercises.type';
import { CreateRutineWithExercisesInput } from './dto/create-rutine-exercises';
import { RutinesTypeType } from 'src/rutines_type/rutines_type.type';

@Injectable()
export class RutineService {
  constructor(
    @InjectRepository(RutinesType)
    private RutinesTypeRepository: Repository<RutinesType>,
    
    @InjectRepository(ExercisesByRutine)
    private readonly ExercisesByRutineRepository: Repository<ExercisesByRutine>,

    @InjectRepository(Rutine)
    private readonly RutineRepository: Repository<Rutine>,
  ) {}

  private relations = [
    'company',
    'user',
    'role1',
    'role2',
    'role3',
    'exercisesByRutine',
    'user.company',
    'user.role',
    'exercisesByRutine.exercise',
    'exercisesByRutine.rutineType',
  ];
  
  async createRutine(CreateRutineInput: CreateRutineInput): Promise<Rutine> {
    let {
      userId,
      companyId,
      roleId1,
      roleId2,
      roleId3
    } = CreateRutineInput;

    const Rutine = await this.RutineRepository.create({
      user: {id: userId} as User,
      company: {id: companyId} as Company,
      role1: {id: roleId1} as Role,
      role2: {id: roleId2} as Role,
      role3: {id: roleId3} as Role,
      ...CreateRutineInput
    });
    
    return this.RutineRepository.save(Rutine);
  }
  
  async createRutineWithExercises(CreateRutineInput2: CreateRutineWithExercisesInput): Promise<Rutine> {
    let {
      userId,
      companyId,
      roleId1,
      roleId2,
      roleId3,
      exercises
    } = CreateRutineInput2;

    const Rutine = await this.RutineRepository.create({
      user: {id: userId} as User,
      company: companyId ? {id: companyId} as Company : undefined,
      role1: roleId1 ? {id: roleId1} as Role : undefined,
      role2: roleId3 ? {id: roleId2} as Role : undefined,
      role3: roleId3 ? {id: roleId3} as Role : undefined,
      ...CreateRutineInput2
    });
    const _rutine = await this.RutineRepository.save(Rutine);
    exercises.forEach(async exercise  => {
      let {
        exerciseId,
        rutineTypeId,
      } = exercise;
      const Rutiness = await this.ExercisesByRutineRepository.create({
        user: {id: userId} as User,
        exercise: {id: exerciseId} as Exercise,
        rutineType: {id: rutineTypeId} as RutinesTypeType,
        rutine: {id: _rutine.id} as Rutine,
        weightByKilos: '',
        obs: "",
        ...exercise
      });
      await this.ExercisesByRutineRepository.save(Rutiness);
      
    });
    
    return this.RutineRepository.save(Rutine);
  }

  async getActualRutineOrderRutineType(userId: string): Promise<{
    rutineTypeName: string; exercises:any, days:any
    name: String, dateIni: Date, dateEnd: Date
  }[]> {
    const result: {
      rutineTypeName: any,
      exercises: any,
      days:any,
      name: String,
      dateIni: Date,
      dateEnd: Date
    }[] = [];
    try {
      const rutines: Rutine[] = await this.getActualRutine(userId);
      if (rutines.length === 0) {
        throw('sin rutinas');
      }
      
      const exercises = await this.getExercisesByRutine(rutines[0].id);  
      
  
      // Obtener RutineTipeId únicos
      const uniqueTypeIds = this.getUniqueTypeId(exercises);
  
  
      // Iterar sobre cada RutineTipeId único
      uniqueTypeIds.forEach(typeId => {
        // Filtrar elementos por RutineTipeId y agregar al resultado
        const filteredItems = exercises.filter(item => item.rutineType && item.rutineType?.id === typeId);
        const days = [...new Set(filteredItems.map(item => item.days))];
        result.push({ 
          rutineTypeName: filteredItems[0].rutineType?.name,
          days,
          exercises: filteredItems,
          name: rutines[0].name,
          dateIni: rutines[0].dateIni,
          dateEnd: rutines[0].dateEnd,
        });
      });
    } catch (error) {
      console.log(error, '-');
      return []
    }
    
    
    return result
  }

  async getActualRutineOrderDays(userId: string): Promise<{ day: number; rutineType: ExercisesByDay;}[]> {
    const rutines = await this.getActualRutine(userId);
    const exercises = await this.getExercisesByRutine(rutines[0].id)
    
    
    const result: { rutineTypeName: any, exercises: any, days:any }[] = [];
    const result2: any = [];
    // // Obtener Days únicos
    const uniqueDays = this.getUniqueDays(exercises);

    // // Iterar sobre cada RutineTipeId único
    uniqueDays.forEach(day => {
      // Filtrar elementos por RutineTipeId y agregar al resultado
      const filteredItemsByDay = exercises.filter(item => item.days === day);
      const typeIds = [...new Set(filteredItemsByDay.map(item => {
        if (item.rutineType !== null) {
          return item.rutineType?.id
        }
      }))];
      const itemsbyTypeId: any = [];
      typeIds.forEach(typeId => {
        // Filtrar elementos por RutineTipeId y agregar al resultado
        const filteredItemsBytypeId = filteredItemsByDay.filter(item => item.rutineType && item.rutineType?.id === typeId);
        itemsbyTypeId.push(
          {
            rutineTypeName: filteredItemsBytypeId[0].rutineType?.name,
            exercises: filteredItemsBytypeId
          }
        );
      });
      result2.push({ 
        day,
        rutineType: itemsbyTypeId,
      });
    });
    return result2
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

  private async getActualRutine(userId: string) {
    return await this.RutineRepository.find({
      where: {
        user: {id: userId} as User,
        active: true
      },
      order:  {
        dateIni: "DESC"
      },
      relations: this.relations
    })
  }

  private async getExercisesByRutine(rutineId: string) {
    return await this.ExercisesByRutineRepository.find({
      where: {
        rutine: {id: rutineId} as Rutine,
      },
      relations: ['rutineType', 'exercise', 'rutine']
    });
  }



  private getUniqueTypeId(exercises: any) {
    return [...new Set(exercises.map(item => {
      if (item.rutineType !== null) {
        return item.rutineType?.id
      }
    }))] 
  }

  private getUniqueDays(exercises: any) {
    return [...new Set(exercises.map(item => {
      if (item.days !== null) {
        return item.days
      }
    }))] 
  }
}
