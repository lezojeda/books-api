import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  app.enableCors();

  let port = process.env.PORT;
  if (port == null || port == '') {
    port = '3333';
  }
  await app.listen(process.env.PORT);
}
bootstrap();
