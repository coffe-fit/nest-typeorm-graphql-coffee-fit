import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { roleType } from './role.type';

@Resolver(of => roleType)
export class RolesResolver {
  constructor(private readonly roleService: RolesService) {}

  @Mutation(returns => roleType)
  async role_create(@Args('createRoleInput') createRoleInput: CreateRoleInput): Promise<Role> {
    return this.roleService.createRole(createRoleInput);
  }

  @Query(returns => [roleType])
  async role_findAll(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @Query(returns => roleType)
  async role_findById(@Args('roleId') id: string): Promise<Role> {
    return this.roleService.getRoleById(id);
  }

  @Mutation(returns => roleType)
  role_update(
    @Args('roleId') id: string,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    return this.roleService.updateRole(id, updateRoleInput);
  }

  @Mutation(returns => roleType)
  async role_delete(@Args('roleId') id: string): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
