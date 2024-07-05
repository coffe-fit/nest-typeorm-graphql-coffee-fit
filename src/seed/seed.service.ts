import { Injectable } from '@nestjs/common';
import { CreateSeedInput } from './dto/create-seed.input';
import { UpdateSeedInput } from './dto/update-seed.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { initialData } from './data/_seed.data';
import { User } from 'src/users/entities/user.entity';
import { getTodayFormat } from 'src/utils';
import { Company } from 'src/companies/entities/company.entity';
import { RutinesType } from 'src/rutines_type/entities/rutines_type.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { v4 as uuid } from 'uuid';
import { ExercisesMetrics } from 'src/exercises-metrics/entities/exercises-metrics.entity';
import { exercisesMetricsType } from 'src/exercises-metrics/exercises-metrics.type';

//recomendacion Eliminar los exercixex by rutine y rutine yusuarios de forma manual per ejecutar el seed
@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Role) private readonly exercisesMetricsRepository: Repository<ExercisesMetrics>,
    @InjectRepository(RutinesType) private readonly rutinesTypeTypeRepository: Repository<RutinesType>,
    @InjectRepository(Exercise) private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
  ) {}

  async runSeed() {
    try {
      await this.deleteTables();
      await this.insertRoles();
      await this.insertExercisesMetrics();
      await this.insertRutineType();
      await this.insertExercise();

      await this.insertCompany();
      await this.insertUsers();

      return {
        seed: "jejeje"
      };
    } catch (error) {
      return {
        error
      }
    }
    
  }

  private async deleteTables() {
    // await  this.roleRepository.clear();

    // const queryBuilderUser = this.userRepository.createQueryBuilder();
    // await queryBuilderUser
    // .delete()
    // .where({})
    // .execute()

    const queryBuilderCompanies = this.companyRepository.createQueryBuilder();
    await queryBuilderCompanies
    .delete()
    .where({})
    .execute()

    const queryBuilderExercise = this.exerciseRepository.createQueryBuilder();
    await queryBuilderExercise
    .delete()
    .where({})
    .execute()

    const queryBuilderRole = this.roleRepository.createQueryBuilder();
    await queryBuilderRole
    .delete()
    .where({})
    .execute();

    const queryBuilderRutinesType = this.rutinesTypeTypeRepository.createQueryBuilder();
    await queryBuilderRutinesType
    .delete()
    .where({})
    .execute()

    const queryBuilderExercisesMetrics = this.exercisesMetricsRepository.createQueryBuilder();
    await queryBuilderExercisesMetrics
    .delete()
    .where({})
    .execute()
  }


  private async insertRoles() {
    const seedRoles = initialData.roles;
    const roles: Role[] = [];
    seedRoles.forEach(role=>{
      roles.push(this.roleRepository.create(role))
    })
    await this.roleRepository.save(seedRoles);
  }

  private async insertExercisesMetrics() {
    const seedMetrics = initialData.exercisesMetrics;
    const exercisesMetricsall: any[] = [];
    seedMetrics.forEach(metrics=>{
      exercisesMetricsall.push(this.exercisesMetricsRepository.create(metrics))
    })
    await this.exercisesMetricsRepository.save(seedMetrics);
  }
  private async insertUsers() {
    const seedUser = initialData.users;
    const users: User[] = [];
    seedUser.forEach(async user1 => {
      let {roleId, roleName, companyId, ...dataInput} = user1;
      const role = { id: roleId } as unknown as Role || {}
      const _user: User = {
        role,
        company: companyId ? {id: companyId} as Company : undefined,
        active: true,
        date_register: getTodayFormat(),
        ...dataInput
      }
      await this.userRepository.save(this.userRepository.create(_user));
    });
  }

  private async insertRutineType() {
    const seedRutineType = initialData.rutineType;
    const rutineType: RutinesType[] = [];
    seedRutineType.forEach(_rutineType=>{
      rutineType.push(this.rutinesTypeTypeRepository.create(_rutineType))
    })
    await this.rutinesTypeTypeRepository.save(seedRutineType);
  }

  private async insertExercise() {
    const seedExercise = initialData.exercises;
    const exercises: Exercise[] = [];
    seedExercise.forEach(async _exercises=>{
      let { rutineType, ...dataInput} = _exercises;
      const _rutineType = await this.rutinesTypeTypeRepository.findOne({
        where: {name: rutineType}
      });
      const _execsise1: Exercise = {
        rutineType: _rutineType,
        ...dataInput
      }
      await this.exerciseRepository.save(this.exerciseRepository.create(_execsise1));
    })
    
  }


  private async insertCompany() {
    const seedCompanies = initialData.companies;
    const companies: Company[] = [];
    seedCompanies.forEach(async _companies=>{
      let { ...dataInput} = _companies;
      const _companies1: Company = {
        ...dataInput
      }
      await this.companyRepository.save(this.companyRepository.create(_companies1));
    })
    
  }
}
