import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getDataById, updateCode, getTodayFormat } from 'src/utils';
import { Rutine } from 'src/rutines/entities/rutine.entity';
import { RutineService } from 'src/rutines/rutines.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly rutineService: RutineService,

    @InjectRepository(Rutine) private rutineRepository: Repository<Rutine>,
    @InjectRepository(Company) private CompanyRepository: Repository<Company>,
    @InjectRepository(Role) private RoleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  private relations = ['company', 'role'];

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    let {roleId, companyId, ...dataInput} = createUserInput;
    // const role = { name: roleId } as unknown as Role || {}
    const role = await this.RoleRepository.findOne({
      where: {name: roleId || 'CLIENT'}
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

  async getAllUsersByRoles(roles: string[]): Promise<any> {
    const Role = await this.RoleRepository.find({
      where: { name: In(roles)}
    });
    
    const arryRolesId: string[] = []
    Role.forEach(Role => {
      arryRolesId.push(Role?.id)
    });

    const users = await this.userRepository.find({
      where: {
        role: {id: In(arryRolesId)},
        active: true
      }
    });

    const jjjj= users.map(async (user: User) => {
      const rutines = await this.rutineService.getActualRutineOrderRutineType(user.id);
      console.log(rutines, 'jjjj');
      return {
        ...user,
        rutines: rutines
      }
    });
    console.log(await Promise.all(jjjj), '---------------------------');
    const ajsald = await Promise.all(jjjj)
    return ajsald
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
