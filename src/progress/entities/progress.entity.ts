import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity()
export class Progress {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column()
  measurement: String;

  @Column()
  bodyIndex: string;

  @Column({
    type: 'timestamp',
  })
  dateCreated: Date;

  @Column()
  obs: string;

  @Column({
    type: 'numeric',
    default: null,
    nullable: true
  })
  weightByKilos: number;

  @ManyToOne(() => User, (user) => user.progress, {onDelete: "CASCADE"})
  @JoinColumn()
  user: User;
}
