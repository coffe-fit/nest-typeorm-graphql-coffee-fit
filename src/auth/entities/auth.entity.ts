import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity()
export class Auth {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column('text')
  tokenAuth: String;

  @ManyToOne(() => User, (user) => user.auth)
  user?: User[];
}
