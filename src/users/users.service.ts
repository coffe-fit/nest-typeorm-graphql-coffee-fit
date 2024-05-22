import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
import { CreateUserInputPassLess } from './dto/create-user-passless.input';

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
    const user = this.userRepository.create(
      {
        role: {id: roleId} as Role,
        company: {id: companyId} as Company,
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

  async createUser2(createUserInputPassLess: CreateUserInputPassLess): Promise<User> {
    let {roleId, companyId, ...dataInput} = createUserInputPassLess;
    const user = this.userRepository.create(
      {
        role: {id: roleId} as Role,
        company: companyId && {id: companyId} as Company,
        active: true,
        date_register: getTodayFormat(),
        ...dataInput
      });
    return await this.userRepository.save(user);
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

    const _rutineService= users.map(async (user: User) => {
      const rutines = await this.rutineService.getActualRutineOrderRutineType(user.id);
      return {
        ...user,
        userId: user.id,
        rutines: rutines
      }
    });
    const _rutinas = await Promise.all(_rutineService)
    console.log(_rutinas);
    
    return _rutinas
  }

  async updateUser(userId: string, updateUserInput:UpdateUserInput): Promise<User> {
    let { roleId, companyId, ...toUpdate } = updateUserInput;
    console.log(companyId);
      const user = await updateCode(
        userId,
        {
          role: roleId && {id: roleId} as Role,
          company: companyId && {id: companyId} as Company,
          ...toUpdate
        },
        this.userRepository
      );
      try {
        
      const response = await this.userRepository.save(user);
      console.log(response);
      
      return response;
      } catch (error) {
        throw new BadRequestException({error});
      }
    
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
