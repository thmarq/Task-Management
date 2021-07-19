import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenUser } from 'src/auth/decorators/token-user.decorator';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksWithFilter } from './dtos/filters/get-task-with-filters.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
// import { Task, TaskStatus } from './model';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity, TaskStatus } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))// added guard to all apis
export class TasksController {
  private logger = new Logger('TasksController'); // instantiting a loger and enabiling for all methods in this class
  //where task controller is context
  constructor(
    private readonly taskService: TasksService
  ) { }

  // @UsePipes(ValidationPipe) //canbe given like this for validation
  @Get()
  async getTasks(
    @Query(ValidationPipe) filters: GetTasksWithFilter,
    @TokenUser() tokenUser: any
  ) { //can also provide pipe inside query
    this.logger.verbose(`User Getting All Tasks ____________`)
    return await this.taskService.getAllTasks(filters, tokenUser)
    // if (filters) {
    //   return this.taskService.getTaskWithFilters(filters)
    // } else {
    //   return this.taskService.getAllTasks();
    // }
  }


  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @TokenUser() tokenUser: any
  ): Promise<TaskEntity> {
    return await this.taskService.getTaskById(id, tokenUser);
  }

  @Post()
  @UsePipes(ValidationPipe) // added default validation , need to use this when specify decorators in dto , otherwise not work
  async createTask(
    @Body() dto: CreateTaskDto,
    @TokenUser() tokenUser: any
  ): Promise<TaskEntity> {
    return await this.taskService.createTask(dto, tokenUser)
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @TokenUser() tokenUser: any
  ) {
    return await this.taskService.updateTaskStatus(id, status, tokenUser)
  }


  @Delete('/:id')
  async deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @TokenUser() tokenUser: any
  ) {
    return this.taskService.deleteTaskById(id, tokenUser)
  }


  // // @UsePipes(ValidationPipe) //canbe given like this for validation
  // @Get()
  // getTasks(@Query(ValidationPipe) filters: GetTasksWithFilter): Task[] { //can also provide pipe inside query
  //   if (filters) {
  //     console.log("Inside");
  //     return this.taskService.getTaskWithFilters(filters)
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string) {
  //   return this.taskService.getTaskById(id);
  // }

  // @Post()
  // @UsePipes(ValidationPipe) // added default validation , need to use this when specify decorators in dto , otherwise not work
  // createTask(
  //   @Body() dto: CreateTaskDto,
  // ): Task {
  //   return this.taskService.createTask(dto)
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string) {
  //   return this.taskService.deleteTaskById(id)
  // }

  // @Patch('/:id/tasks')
  // updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
  //   return this.taskService.updateTask(id, dto)
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status',TaskStatusValidationPipe) status: TaskStatus) {      
  //   return this.taskService.updateTaskStatus(id, status)
  // }
}
