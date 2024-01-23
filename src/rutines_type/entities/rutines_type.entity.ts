import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Rutine } from "src/rutines/entities/rutine.entity";

@Entity()
export class RutinesType {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column('text')
  active: Boolean;

  @Column('text')
  name: String;

  @OneToMany(() => Rutine, (rutine) => rutine.rutineType)
  rutines: Rutine[];
}
