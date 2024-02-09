// firebase.decorator.ts

import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseAuthGuard as FGuard } from '../guards/firebase-auth.guard';

export function FirebaseAuthGuard() {
  
  const jjjj = applyDecorators(
    UseGuards(AuthGuard(), FGuard),
  )
  jjjj;
  return SetMetadata('firebase', true);
}
