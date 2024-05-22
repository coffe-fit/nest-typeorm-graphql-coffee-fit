import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  weight: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  rightShoulder: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  leftShoulder: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  rightBicep: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  leftBicep: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  rightLeg: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  leftLeg: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  chest: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  rightCalf: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  leftCalf: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  waist: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  rightForearm: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  leftForearm: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  diet: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  height: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  age: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  bodyFatPercentage: string;

  @Column({ type: 'varchar', nullable: true ,default: '' })
  muscleMass: string;

  @Column({ type: 'varchar', nullable: true,default: '' })
  restingHeartRate: string;

  @Column({ type: 'varchar', nullable: true,default: '' })
  bloodPressure: string;

  @Column({ type: 'varchar', nullable: true,default: '' })
  endurance: string;

  @Column({ type: 'varchar', nullable: true ,default: ''})
  flexibility: string;

  @Column({ type: 'varchar', nullable: true,default: '' })
  strengthLevel: string;

  @Column({ type: 'varchar', nullable: true,default: '' })
  injuryHistory: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  fitnessGoals: string;

  @Column({ type: 'varchar', nullable: true, default: ''})
  obs: string;

  @Column({ type: 'timestamp'})
  dateCreated: string;

  @ManyToOne(() => User, (user) => user.progress, {onDelete: "CASCADE"})
  @JoinColumn()
  user: User;
}
