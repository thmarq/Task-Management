import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'abcd',
  database: 'task_managements',
  autoLoadEntities: true,
  // entities: [__dirname + '/../**/*.entity.ts'], //any folder , any file end with entity.ts
  synchronize: true,
}