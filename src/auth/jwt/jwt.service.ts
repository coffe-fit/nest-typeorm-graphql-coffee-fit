// firebase.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class jwtService {
  constructor(
    private readonly jwtService: JwtService,
  ){}
  private getJwtToken( payload: any) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}