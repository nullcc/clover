import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import { ExceptionInterceptor } from '@infrastructure/interceptors/exception.interceptor';
import { typeormConfigTest } from '@config/ormconfig-test';

describe('PaymentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeormConfigTest), AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();

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
  });

  afterAll(async () => {
    await app.close();
  });

  it('[GET] /api/v1/payments get payments', () => {
    return request(app.getHttpServer())
      .get('/api/v1/payments')
      .expect(200)
      .expect([
        {
          id: '675b5c6f-52de-474f-aba6-f7717844a5e8',
          createdAt: '2020-08-07T12:29:11.214Z',
          updatedAt: '2020-08-07T12:29:11.214Z',
          type: 'PrivateToPrivate',
          paymentAccountId: '6225760008219524',
          receiptAccountId: '5264106268735359',
          amount: 100,
          currency: 'USD',
          comment: 'travel fee',
        },
        {
          id: 'a877f456-3284-42d1-b426-4c5f44eca561',
          createdAt: '2020-08-07T12:29:11.214Z',
          updatedAt: '2020-08-07T12:29:11.214Z',
          type: 'PrivateToPublic',
          paymentAccountId: '6225760008219524',
          receiptAccountId: '5264106268735359',
          amount: 200,
          currency: 'RMB',
          comment: 'travel fee',
        },
      ]);
  });

  it('[GET] /api/v1/payments/{paymentId} get payment', () => {
    return request(app.getHttpServer())
      .get('/api/v1/payments/675b5c6f-52de-474f-aba6-f7717844a5e8')
      .expect(200)
      .expect({
        id: '675b5c6f-52de-474f-aba6-f7717844a5e8',
        createdAt: '2020-08-07T12:29:11.214Z',
        updatedAt: '2020-08-07T12:29:11.214Z',
        type: 'PrivateToPrivate',
        paymentAccountId: '6225760008219524',
        receiptAccountId: '5264106268735359',
        amount: 100,
        currency: 'USD',
        comment: 'travel fee',
      });
  });

  it('[POST] /api/v1/payments create payment', () => {
    return request(app.getHttpServer())
      .post('/api/v1/payments')
      .send({
        type: 'PrivateToPrivate',
        paymentAccountId: '6225760008219524',
        receiptAccountId: '5264106268735359',
        amount: 300,
        currency: 'JPY',
        comment: 'travel fee',
      })
      .expect(201);
  });
});
