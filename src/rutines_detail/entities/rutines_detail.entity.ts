// rutine-detail2.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Rutine } from '../../rutines/entities/rutine.entity';

@Entity()
export class RutineDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  frequency: string;

  @Column()
  amountMax: string;

  @Column()
  intensity: string;

  @Column()
  frequencyCardiac: string;

  @Column()
  pulsation: string;

  @Column()
  seriesRange: string;

  @Column()
  rest: string;

  @Column()
  days: string;

  @Column()
  obs: string;

  @OneToOne(() => Rutine, (rutine) => rutine.rutineDetail)
  @JoinColumn({name: 'rutineId'})
  rutine: Rutine;
}
