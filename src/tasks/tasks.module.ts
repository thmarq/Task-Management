import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from './repository/task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([TaskRepository]) //can provide both entity or repo , if repo declared with decorator
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
