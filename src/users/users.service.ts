import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Rutine } from 'src/rutines/entities/rutine.entity';
import { getDataById, updateCode, getTodayFormat } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(Rutine) private rutineRepository: Repository<Rutine>,
    @InjectRepository(Company) private CompanyRepository: Repository<Company>,
    @InjectRepository(Role) private RoleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  private relations = ['company', 'role'];

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    let {roleId, companyId, ...dataInput} = createUserInput;
    // const role = { name: roleId } as unknown as Role || {}
    const role = await this.RoleRepository.findOne({
      where: {name: roleId}
    })
    // const company = {nameId: companyId} as unknown as Company || {}
    const company = await this.CompanyRepository.findOne({
      where: {nameId: companyId}
    })
    const user = this.userRepository.create(
      {
        role,
        company,
        active: true,
        date_register: getTodayFormat(),
        ...dataInput
      });
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: this.relations
    });
  }
  async updateUser(userId: string, updateUserInput:UpdateUserInput): Promise<User> {
    let { ...toUpdate } = updateUserInput;
    const user = await updateCode(
      userId,
      toUpdate,
      this.userRepository
    );
    return this.userRepository.save(user);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async findOneUser(userId: string): Promise<User> {
    const exercise = await getDataById(
      userId,
      this.userRepository,
      this.relations
      );
    return exercise;
  }
}
