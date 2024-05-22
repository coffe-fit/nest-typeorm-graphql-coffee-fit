import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersType } from './types/users.type';
import { UsersRutinesType } from './types/usersRutines.type';
import { User } from './entities/user.entity';
import { BadRequestException, HttpCode, NotFoundException, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserInputPassLess } from './dto/create-user-passless.input';

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
    @Args('createUserInputPassLess') createRecordInput: CreateUserInputPassLess) {
      console.log(createRecordInput);
      
    return this.usersService.createUser2(createRecordInput);
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
  async user_update(
    @Args('userId') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput) {
      console.log(updateUserInput);
      try {
        const response = await this.usersService.updateUser(id, updateUserInput);
        if (!response) {
          throw new NotFoundException("User with ID ${id} not found");
        }
        return response;
      } catch (error) {
        console.error(error);
        if (error instanceof NotFoundException) {
          throw error; // Re-lanza la excepción para que NestJS la maneje y envíe el response adecuado
        }
        if (error instanceof BadRequestException) {
          console.log('--------------------------------');
          
          throw error; // Re-lanza la excepción para que NestJS la maneje y envíe el response adecuado
        }
        // Lanza una excepción genérica para cualquier otro tipo de error
        throw new Error('An unexpected error occurred');
      }
  }

  @Mutation(returns => UsersType)
  remove(@Args('userId') id: string) {
    return this.usersService.deleteUser(id);
  }
}
