import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
// import { Task, TaskStatus } from './model';
import * as uuid from 'uuid';
import { GetTasksWithFilter } from './dtos/filters/get-task-with-filters.dto';
import { TaskRepository } from './repository/task.repository';
import { TaskEntity } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {

  private logger = new Logger('TasksService')

  constructor(@InjectRepository(TaskRepository)
  private taskRepository: TaskRepository
  ) { }

  async getAllTasks(filters: GetTasksWithFilter, tokenUser) {
    const { search, status } = filters;
    let query = await this.taskRepository.createQueryBuilder('task') //task is a key name of qry builder
    query.where('task.user=:userId', { userId: tokenUser.id })
    if (status) {
      query.andWhere('task.status= :status', { status })
      // can user where , andWhere but where replaces another where query exist in function , it overwrites
    }

    if (search) {
      query.andWhere('task.name LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
      // LIKE is smilar to equal but it supports partial values
      //% support for partial input values
    }
    try {
      let tasks = await query.getMany();
      return tasks;
    }
    catch (e) {
      this.logger.error('Failed to get tasks',e.stack)
      throw new InternalServerErrorException(e.message)
    }
    
  }

  async getTaskById(id: number, tokenUser?: any): Promise<TaskEntity> {
    let task = await this.taskRepository.findOne({ where: { id, userId: tokenUser.id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    return task;
  }

  async createTask(dto: CreateTaskDto, tokenUser: User): Promise<TaskEntity> {
    const { name, description } = dto; //es6 syntax
    let task = await this.taskRepository.create(Object.assign({}, dto, { user: tokenUser }))
    console.log("Tastk Created _____", task);
    return task.save();
  }

  async updateTaskStatus(id: number, dto, tokenUser) {
    console.log(id, dto);

    let task = await this.getTaskById(id, tokenUser);
    let updatedTask = await this.taskRepository.update(id, { status: dto })
    return updatedTask;
  }

  async deleteTaskById(id: number, tokenUser) {
    const found = await this.getTaskById(id, tokenUser);
    let task = await this.taskRepository.delete({ id: id.toString() });
    return task;
  }








  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilters(dto: GetTasksWithFilter): Task[] {
  //   let tasks = this.tasks;
  //   console.log(dto, "dto");

  //   const { status, name, search } = dto
  //   console.log(status);
  //   console.log(name);
  //   console.log(search);

  //   if (status) {
  //     tasks = tasks.filter((task) =>
  //       task.status == dto.status
  //     )
  //   }
  //   if (name) {
  //     console.log("inside servcei");

  //     tasks = tasks.filter((task) =>
  //       task.name == dto.name
  //     )
  //     console.log("tasks ===", tasks);

  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) =>
  //       task.name.includes(search)
  //       // task.status.includes(search) ||
  //       // task.description.includes(search)
  //     )
  //   }
  //   return tasks;

  // }

  // getTaskById(id: string): Task {
  //   let task = this.tasks.find((task) => task.id == id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with ID ${id} not found`)
  //   }    
  //   return task;
  // }

  // deleteTaskById(id: string) {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id)
  //   return this.tasks;
  // }

  // createTask(dto: CreateTaskDto): Task {
  //   const { name, description } = dto; //es6 syntax

  //   let task: Task = {
  //     id: uuid.v4(),
  //     name,
  //     description,
  //     status: TaskStatus.OPEN
  //   }
  //   this.tasks.push(task)
  //   console.log("Task Created ____", task);

  //   return task;
  // }

  // async updateTask(id, dto) {
  //   let task = await this.getTaskById(id);
  //   task.name = dto.name
  //   task.description = dto.description;
  //   task.status = dto.status;
  //   return task;
  // }

  // async updateTaskStatus(id, status) {
  //   let task = await this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
