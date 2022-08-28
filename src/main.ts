import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';

import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2/');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist           : true,
      forbidNonWhitelisted: true,
      transform           : true,
      transformOptions    : {
        enableImplicitConversion: true
      }
    })
  );

  await app.listen(env.PORT);
}

bootstrap();
