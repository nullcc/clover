import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as supertest from 'supertest';
import { AppModule } from '@src/app.module';
import { ExceptionInterceptor } from '@infrastructure/interceptors/exception.interceptor';
import { typeormConfigTest } from '@config/ormconfig-test';

export const getApplication = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TypeOrmModule.forRoot(typeormConfigTest), AppModule],
  }).compile();
  const app = moduleFixture.createNestApplication();

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

  await app.init();

  return app;
};

export const getHttpServer = (
  app: INestApplication,
): supertest.SuperTest<supertest.Test> => {
  return supertest(app.getHttpServer());
};
