import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressInput } from './dto/create-progress.input';
import { UpdateProgressInput } from './dto/update-progress.input';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { getDataById, updateCode, getTodayFormat, getDataByUserId,getDataByUserId2 } from 'src/utils';
// import { FirebaseAuthGuard } from '../auth/decorators/firebase.decorators';
// import { JwtAuthGuard } from '../auth/decorators/jwt.decorator';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
  ) {}


  private relations = ['user', 'user.company', 'user.role'];
  
  async createProgress(createProgressInput: CreateProgressInput): Promise<Progress> {
    let {userId, ...progress} = createProgressInput;
    const dateCreated = getTodayFormat();
    
    const newProgress = await this.progressRepository.create({
      dateCreated,
      user: {id: userId} as User,
      ...progress
    });
    return this.progressRepository.save(newProgress);
  }
  // @JwtAuthGuard()
  async findAllProgress(): Promise<Progress[]> {
    return await this.progressRepository.find({
      relations: this.relations,
    });
  }

  async findByIdProgress(processId: string): Promise<Progress> {
    const progress = await getDataById(
      processId,
      this.progressRepository,
      this.relations
      );
    return progress;
  }


  async findByUserIdProgress(userId: string): Promise<Progress> {
    const progress = await getDataByUserId2(
      userId,
      this.progressRepository,
      this.relations
      );
    return progress;
  }

  async updateProgress(processId: string, updateProgressInput: UpdateProgressInput): Promise<Progress> {
    let { ...toUpdate } = updateProgressInput;
    const progress = await updateCode(
      processId,
      toUpdate,
      this.progressRepository
    );
    return this.progressRepository.save(progress);
  }

  async removeProgress(processId: string): Promise<any> {
    return await this.progressRepository.delete(processId);
  }
}
