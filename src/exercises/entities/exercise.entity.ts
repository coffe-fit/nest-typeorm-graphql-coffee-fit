
import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Rutine } from 'src/rutines/entities/rutine.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  @IsString()
  name: string;

  
  @Column()
  @IsUrl()
  imgGood: string;

  @Column()
  @IsUrl()
  imgBad: string;

  @Column('bool',{
    default: true
  })
  active: boolean;

  @Column('bool',{
    default: true
  })
  activeByCompany: boolean;

  @ManyToOne(() => User, (user) => user.exercise, {
    onDelete: 'CASCADE',
  })
  userCreator: User;

  @OneToMany(() => Role, (role) => role.exercise)
  role: Role[];

  @OneToMany(() => Rutine, (rutine) => rutine.exercise)
  rutine: Rutine[];
}
