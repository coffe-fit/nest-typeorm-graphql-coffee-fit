import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { AuthType } from './auth.type';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AuthForanyToken } from './dto/auth-forany.input';

@Resolver(of => AuthType )
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns  => AuthType)
  auth_signIn(@Args('signInAuthInput') signInAuthInput: CreateAuthInput) {
    return this.authService.signIn(signInAuthInput);
  }

  @Mutation(returns  => AuthType)
  auth_signInForanyToken(@Args('signInAuthInput') signInAuthInput: AuthForanyToken) {
    return this.authService.signInFromFirebase(signInAuthInput);
  }

  @Mutation(returns  => AuthType)
  auth_signUp(
    @Args('createUserInput') createUserInput: CreateUserInput
  ) {
    return this.authService.signUp(createUserInput);
  }
  

  @Query(returns  => AuthType)
  auth_signOut(@Args('userId') id: string) {
    return this.authService.signOut(id);
  }
}
