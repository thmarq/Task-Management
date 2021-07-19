import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './tasks/configs/type-orm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
