import { Injectable } from '@nestjs/common';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateCode, getDataById, deleteCode, ownNotFoundException } from 'src/utils';
import { User } from 'src/users/entities/user.entity';
import { RutinesType } from 'src/rutines_type/entities/rutines_type.entity';
import { RutinesTypeType } from 'src/rutines_type/rutines_type.type';


@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  private relations = ['userCreator', 'userCreator.company', 'userCreator.role', 'rutineType'];
  
  async createExercise(createExerciseInput: CreateExerciseInput, userId: string): Promise<Exercise> {
    let { rutineTypeId, ...dataInput } = createExerciseInput;
    console.log({rutineType: {id: rutineTypeId} as any});
    const exercise = this.exerciseRepository.create(
      {
        rutineType: {id: rutineTypeId} as any,
        userCreator: {id: userId} as User,
        ...dataInput
      });
    return await this.exerciseRepository.save(exercise);
  }

  async getAllExercises(): Promise<Exercise[]> {
    return await this.exerciseRepository.find({
      relations: this.relations
    });
  }

  async getExerciseById(exerciseId: string): Promise<Exercise> {
    const exercise = await getDataById(
      exerciseId,
      this.exerciseRepository,
      this.relations
      );
    return exercise;
  }

  async getExerciseByRutineTypeId(rutineTypeId: string): Promise<Exercise[]> {
    const exercise = await this.exerciseRepository.find({
      where: {rutineType: {id: rutineTypeId} as RutinesType},
      relations: this.relations
    })
    ownNotFoundException(rutineTypeId, exercise);
    return exercise;
  }

  async updateExercise(exerciseId: string, updateExerciseInput: UpdateExerciseInput): Promise<Exercise> {
    let { ...toUpdate } = updateExerciseInput;
    const exercise = await updateCode(
      exerciseId,
      toUpdate,
      this.exerciseRepository
    );
    return this.exerciseRepository.save(exercise);
  }

  async deleteExercise(exerciseId: string): Promise<void> {
    await deleteCode(exerciseId, this.exerciseRepository)
  }
}
