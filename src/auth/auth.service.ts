import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { FirebaseService } from './firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UsersService,
    private firebaseService: FirebaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(createAuthInput: CreateAuthInput) {
    const {password, email}: any = createAuthInput;

    // para que me retorne solo la data que necesito
    const user = await this.userRepository.findOne({
      where: {email}, //  manda la condición del email
      select: {email: true, password: true, id: true} // seleccione los campos que interesan 
    });
    if (!user)
      throw new UnauthorizedException('Credential are not valid!');
    if (!bcrypt.compareSync(password, user.password)) 
      throw new UnauthorizedException('Credential are not valid p!');
    return {...user, token: this.getJwtToken({
      id: user.id,
      roleId: user.role,
      companyId: user.company
    })};
  }

  async signUp(createUserInput: CreateUserInput) {
    try {
      const { password, ...userData } = createUserInput;
      const user = await this.userService.createUser({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      delete user.password;
      return {...user, token: this.getJwtToken({
        id: user.id,
        roleId: user.role,
        companyId: user.company
      })};;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  signOut(id: string) {
    return `This action returns a #${id} auth`;
  }

  async validateUserFromJwt(token: any){
    const { id }: any = this.jwtService.verify(token);
    const user = await this.userRepository.findOneBy({id});
    if (!user)
      throw new UnauthorizedException('Token not valid');
    if (!user.active)
      throw new UnauthorizedException('User is not active');
    return user
  }

  async validateUserFromFirebase(token: string){
    console.log(token, this.firebaseService.verifyIdToken(token));
    const { id }: any = this.firebaseService.verifyIdToken(token);
    const user = await this.userRepository.findOneBy({id});
    if (!user)
      throw new UnauthorizedException('Token not valid');
    if (!user.active)
      throw new UnauthorizedException('User is not active');
    return user
  }

  generateToken(token: string) {
    return `This action returns a #${token} auth`;
  }

   private validateToken(token: string) {
    return this.jwtService.verify(token)
  }

  private getJwtToken( payload: any) {
    console.log(this.jwtService.sign(payload));
    
    const token = this.jwtService.sign(payload);
    return token;
  }


  // async createJwtToken(user: any) {
  //   const payload = { sub: user.userId, username: user.username };
  //   return this.jwtService.sign(payload);
  // }

  private handleDBErrors(error: any): never { // el never fuerza a que jamas de un return en el metodo
    if (error.code === 23505)
      throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Please check Server logs');
  }
}
