import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutinesDetailInput } from './dto/create-rutines_detail.input';
import { UpdateRutinesDetailInput } from './dto/update-rutines_detail.input';
import { RutineDetail } from './entities/rutines_detail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rutine } from 'src/rutines/entities/rutine.entity';
import { deleteCode, getDataById, updateCode } from 'src/utils';

@Injectable()
export class RutinesDetailService {
  constructor(
    @InjectRepository(Rutine) private rutineRepository: Repository<Rutine>,
    @InjectRepository(RutineDetail)
    private readonly RutineDetailRepository: Repository<RutineDetail>,
  ) {}

  private relations = [
    'rutine',
    'rutine.company',
    'rutine.user',
    'rutine.rutineType',
    'rutine.exercise',
  ];

  async createRutineDetail(
    createRutineDetail: CreateRutinesDetailInput): Promise<RutineDetail> {
    let {rutineId, ...dataInput} = createRutineDetail;
    const rutineDetail = this.RutineDetailRepository.create(
      {
        rutine: {id: rutineId} as Rutine,
        ...dataInput
      });
    const rutine = await updateCode(
      rutineId,
      {rutineDetail: {id: rutineDetail.id} as Rutine},
      this.rutineRepository
    );
  
    const rutineDdetai2 = await this.RutineDetailRepository.save(rutineDetail)
  
    await this.rutineRepository.save(rutine);
    
    return rutineDdetai2;
  }

  async getAllRutineDetail(): Promise<RutineDetail[]> {
    return await this.RutineDetailRepository.find({
      relations: this.relations
    });
  }

  async getRutineDetailById(rutineDetailId: string): Promise<RutineDetail> {
    const rutineDetail = await getDataById(
      rutineDetailId,
      this.RutineDetailRepository,
      this.relations
      );
    return rutineDetail;
  }

  async updateRutineDetail(rutineDetailId: string, updateRutinesDetailInput: UpdateRutinesDetailInput): Promise<RutineDetail> {
    let { ...toUpdate } = updateRutinesDetailInput;
    const rutineDetail = await updateCode(
      rutineDetailId,
      toUpdate,
      this.RutineDetailRepository
    );
    return this.RutineDetailRepository.save(rutineDetail);
  }

  async deleteRutineDetail(rutineDetailId: string): Promise<void> {
    await deleteCode(rutineDetailId, this.RutineDetailRepository)
  }
}
