import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { getApplication, getHttpServer } from '../../jestSetupAfterEnv';

describe('Create payment (e2e)', () => {
  let app: INestApplication;
  let httpServer: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    app = await getApplication();
    httpServer = getHttpServer(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('[POST] /api/v1/payments create payment', async () => {
    const resp = await httpServer
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
    expect(resp.body.id).toMatch(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    );
  });

  it('[POST] /api/v1/payments create payment with nonexistent payment account id', async () => {
    const resp = await httpServer
      .post('/api/v1/payments')
      .send({
        type: 'PrivateToPrivate',
        paymentAccountId: '6225760008219525',
        receiptAccountId: '5264106268735359',
        amount: 300,
        currency: 'JPY',
        comment: 'travel fee',
      })
      .expect(404);
    expect(resp.body.message).toEqual(
      "Account with id '6225760008219525' not found",
    );
  });

  it("[POST] /api/v1/payments create payment but it's insufficient balance", async () => {
    const resp = await httpServer
      .post('/api/v1/payments')
      .send({
        type: 'PrivateToPrivate',
        paymentAccountId: '6225760008219524',
        receiptAccountId: '5264106268735359',
        amount: 3000,
        currency: 'JPY',
        comment: 'travel fee',
      })
      .expect(400);
    expect(resp.body.message).toEqual('Insufficient balance');
  });

  it('[POST] /api/v1/payments create payment with unsupported currency', async () => {
    const resp = await httpServer
      .post('/api/v1/payments')
      .send({
        type: 'PrivateToPrivate',
        paymentAccountId: '6225760008219524',
        receiptAccountId: '5264106268735359',
        amount: 100,
        currency: 'XXX',
        comment: 'travel fee',
      })
      .expect(400);
    expect(resp.body.message).toEqual('Unsupported currency: XXX');
    return;
  });
});
