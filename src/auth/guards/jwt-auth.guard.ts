// jwt-auth.guard.ts

import { Injectable, CanActivate, ExecutionContext, Headers, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { IncomingHttpHeaders, request } from 'http';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const ctx = GqlExecutionContext.create(context).getContext();

    const token = ctx.req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('AuthToken not found.');
      ;
    }

    try {
      const user = await this.jwtStrategy.validate(token);
      
      ctx.user = user;
      return true;
    } catch (error) {
      console.log('JwtAuthGuard', error);
      throw new UnauthorizedException('Token not valid');
    }
  }
}
