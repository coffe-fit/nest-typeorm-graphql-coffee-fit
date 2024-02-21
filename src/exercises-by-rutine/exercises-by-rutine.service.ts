import { Injectable } from '@nestjs/common';
import { CreateExercisesByRutineInput } from './dto/create-exercises-by-rutine.input';
import { UpdateExercisesByRutineInput } from './dto/update-exercises-by-rutine.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Rutine } from 'src/rutines/entities/rutine.entity';
import { RutinesType } from 'src/rutines_type/entities/rutines_type.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ExercisesByRutine } from './entities/exercises-by-rutine.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { RutinesTypeType } from 'src/rutines_type/rutines_type.type';
import { updateCode } from 'src/utils';

@Injectable()
export class ExercisesByRutineService {
  constructor(
    // @InjectRepository(RutinesType)
    // private RutinesTypeRepository: Repository<RutinesType>,

    @InjectRepository(Rutine)
    private readonly RutineRepository: Repository<Rutine>,

    @InjectRepository(ExercisesByRutine)
    private readonly ExercisesByRutineRepository: Repository<ExercisesByRutine>,
  ) {}


  private relations = [
    'rutineType',
    'user',
    'exercise',
    'rutine',
  ];

  async createExercisesByRutineService(createExercisesByRutineInput: CreateExercisesByRutineInput): Promise<ExercisesByRutine> {
    let {
      userId,
      exerciseId,
      rutineTypeId,
      rutineId
    } = createExercisesByRutineInput;

    const Rutiness = await this.ExercisesByRutineRepository.create({
      user: {id: userId} as User,
      exercise: {id: exerciseId} as Exercise,
      rutineType: {id: rutineTypeId} as RutinesTypeType,
      rutine: {id: rutineId} as Rutine,
      weightByKilos: '',
      ...createExercisesByRutineInput
    });
    
    return this.ExercisesByRutineRepository.save(Rutiness);
  }


  async getAllExercises(): Promise<ExercisesByRutine[]> {
    return await this.ExercisesByRutineRepository.find({
      relations: this.relations
    });
  }

  async updateExercise(exerciseByRutineId: string, updateExerciseInput: UpdateExercisesByRutineInput): Promise<ExercisesByRutine> {
    let { ...toUpdate } = updateExerciseInput;
    const exercises = await updateCode(
      exerciseByRutineId,
      toUpdate,
      this.ExercisesByRutineRepository
    );
    return this.ExercisesByRutineRepository.save(exercises);
  }
}
