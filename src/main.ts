import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from '@infrastructure/interceptors/exception.interceptor';
import { SERVER_PORT } from '@config/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Clover')
    .setDescription('The Clover API Specification')
    .setVersion('1.0')
    .addTag('Clover')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(new ExceptionInterceptor());

  app.enableShutdownHooks();

  await app.listen(SERVER_PORT);
}
bootstrap();
