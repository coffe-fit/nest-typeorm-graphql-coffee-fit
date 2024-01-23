import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteCode, getDataById, updateCode } from 'src/utils';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleInput): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async getRoleById(roleId: string): Promise<Role> {
    const role = await getDataById(roleId, this.roleRepository);
    return role;
  }

  async updateRole(roleId: string, updateRoleInput: UpdateRoleInput): Promise<Role> {
    let { ...toUpdate } = updateRoleInput;
    const role = await updateCode(
      roleId,
      toUpdate,
      this.roleRepository
    );
    return this.roleRepository.save(role);
  }

  async deleteRole(roleId: string): Promise<void> {
    await deleteCode(roleId, this.roleRepository)
  }
}
