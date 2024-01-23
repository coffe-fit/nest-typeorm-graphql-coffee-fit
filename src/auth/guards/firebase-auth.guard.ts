// firebase-auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseStrategy } from '../strategies/firebase.strategy';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseStrategy: FirebaseStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const user = await this.firebaseStrategy.validate(token);
      ctx.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
