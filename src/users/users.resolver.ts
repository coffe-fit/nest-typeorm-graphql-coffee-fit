import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersType } from './types/users.type';
import { UsersRutinesType } from './types/usersRutines.type';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(of => UsersType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => UsersService)
  // // @Args('createRecordInput') createRecordInput: 
  // create(@Args('createUserInput') {
  //   username,
  //   document,
  //   gender,
  //   email,
  //   phone,
  //   age,
  //   roleId,
  //   companyId
  // }: CreateUserInput) {
  //   return this.usersService.createUser({
  //     username,
  //     document,
  //     gender,
  //     email,
  //     phone,
  //     age,
  //     roleId,
  //     companyId
  //   });
  // }
  
  // @Args('createRecordInput') createRecordInput:
  @Mutation(returns => UsersType)
  user_create(
    @Args('createUserInput') createRecordInput: CreateUserInput) {
    return this.usersService.createUser(createRecordInput);
  }

  @Query(returns => [UsersType])
  user_findAll() {
    return this.usersService.getAllUsers();
  }

  @Query(returns => [UsersRutinesType])
  @UseGuards(JwtAuthGuard)
  user_findAllByRoleClient() {
    const roles = ['CLIENT', 'NEW_CLIENT', 'INACTIVE_CLIENT', 'TRAIN']
    return this.usersService.getAllUsersByRoles(roles);
  }
  
  @Mutation(returns => UsersType)
  user_update(
    @Args('userId') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Mutation(returns => UsersType)
  remove(@Args('userId') id: string) {
    return this.usersService.deleteUser(id);
  }
}
