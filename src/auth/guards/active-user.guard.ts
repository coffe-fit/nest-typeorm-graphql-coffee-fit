// active-user.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { admin } from '../firebase/firebase.service';
import { FirebaseStrategy } from '../strategies/firebase.strategy';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(private readonly firebaseStrategy: FirebaseStrategy) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }
    
    try {
      const user = await this.firebaseStrategy.validate(token);
      console.log(user);
      
      // ctx.user = user;
      return true;
    } catch (error) {
      return false;
    }
    // return user.emailVerified;
    
  }
}