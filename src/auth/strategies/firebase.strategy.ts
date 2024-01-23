// firebase.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

let serviceAccount = {
  apiKey: process.env.FR_API_KEY,
  authDomain: process.env.FR_AUTH_DOMAIN,
  projectId: process.env.FR_PROYECT_ID,
  storageBucket: process.env.FR_STORAGE_BUCKET,
  messagingSenderId: process.env.FR_MESSAG,
  appId: process.env.FR_APP_ID,
  measurementId: process.env.FR_MESURMENT_ID
}

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase-jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('serviceAccount'),
    });

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: `https://${process.env.FR_APP_ID}.firebaseio.com`,
// });
    // super({
    //   firebaseProjectId: process.env.FR_APP_ID, // Cambia por tu ID de proyecto Firebase
    // });
  }

  async validate(token: string) {
    return this.authService.validateUserFromFirebase(token);
  }
}
