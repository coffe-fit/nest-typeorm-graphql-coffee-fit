import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseStrategy } from './strategies/firebase.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthResolver, AuthService, FirebaseService, JwtStrategy, FirebaseStrategy],
  imports: [
    UsersModule,
    ConfigModule,
    TypeOrmModule.forFeature([User, Auth]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService)=> {
        console.log('jwt con config service', configService.get('JWT_SECRET'));
        console.log('jwt desde env directo', process.env.JWT_SECRET);
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      },
    })
    // JwtModule.register({
    //   secret:process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn:'2h'
    //   }
    // })
  ],
  exports: [
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
    FirebaseStrategy
  ]
})
export class AuthModule {}
