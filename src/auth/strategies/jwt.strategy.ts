import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {  Repository } from 'typeorm';
// import { JwtPayload } from '../interfaces/jwt-pyload.interfaces';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy( Strategy ) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private authService: AuthService,
    private configService: ConfigService
  ){
    super({
      secretOrKey: configService.get(process.env.JWT_SECRET),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // LA POSICION DONDE ESPERO EL TOKEN BEARER TOKE EN EL POSTMAN BUSCAR
    })
  }

  async validate (payload: any): Promise<User> {
    return this.authService.validateUserFromJwt(payload);
  }
}