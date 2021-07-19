import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(); // instantiting a loger
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  logger.log(`Server Running on port 3000`)
}
bootstrap();
