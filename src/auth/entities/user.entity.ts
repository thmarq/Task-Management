import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { TaskEntity } from "src/tasks/tasks.entity";

@Entity()
@Unique(['username']) // this prevent duplication of username , database level
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => TaskEntity, task => task.user, { eager: true })
  //one to many inculde many to one
  //syntax type of one to many variable , and invers side ie how to access entity A from entity b,ie
  // ie here how to access user from task entity , ie task .user
  //eager one side of relation should be true otherside will be false
  //if eager true when we retreive a user we can immeditly acccess user.task which will be array  
  tasks: TaskEntity[]

  @Column({ nullable: true })
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    console.log("This salt is ________", this.salt);
    console.log("password ________", this.password);
    console.log("Function args passwords is ====", password);

    const hash = await bcrypt.hash(password, this.salt);
    console.log("new Hash Password ====", password);
    return hash === this.password;

  }

}