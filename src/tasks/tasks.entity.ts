import { User } from "src/auth/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { TaskStatus } from "./model";
export enum TaskStatus {
  OPEN = "OPEN",
  INPROGRESS = "INPROGRESS",
  CLOSED = "CLOSED",
}

@Entity()
export class TaskEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  //specified type
  // how to access entity B from entity A
  //eager false means 
  user: User;

  @Column()
  userId: Number; // for pg to understand , refereing user relation this field store id 
  // of user created task

  @Column()
  status: TaskStatus
}