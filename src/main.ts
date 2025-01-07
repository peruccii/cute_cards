import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bodyParser: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  dotenv.config();

  app.enableCors({
    origin: 'https://www.cutecards.com.br',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.useBodyParser('json', { limit: '20mb' });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
