import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersType } from './users.type';
import { User } from './entities/user.entity';

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

  @Query(returns => UsersType)
  async exercise_findById(@Args('exerciseId') id: string): Promise<User> {
    return this.usersService.findOneUser(id);
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
