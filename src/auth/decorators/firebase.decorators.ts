// firebase.decorator.ts

import { SetMetadata } from '@nestjs/common';

export const FirebaseAuthGuard = () => SetMetadata('firebase', true);
