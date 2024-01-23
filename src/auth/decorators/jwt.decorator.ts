// jwt.decorator.ts

import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard as jwtwar } from '../guards/jwt-auth.guard';

export function JwtAuthGuard() {
  const jjjj = applyDecorators(
    UseGuards(AuthGuard(), jwtwar),
  )
  jjjj;
  
  return SetMetadata('jwt', true);
}
