import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { getApplication, getHttpServer } from '../../jestSetupAfterEnv';

describe('Delete payment (e2e)', () => {
  let app: INestApplication;
  let httpServer: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    app = await getApplication();
    httpServer = getHttpServer(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('[DELETE] /api/v1/payments delete payment', async () => {
    const resp = await httpServer
      .post('/api/v1/payments')
      .send({
        type: 'PrivateToPrivate',
        paymentAccountId: '6225760008219524',
        recipientAccountId: '5264106268735359',
        amount: 100,
        currency: 'JPY',
        comment: 'travel fee',
      })
      .expect(201);
    return httpServer.delete(`/api/v1/payments/${resp.body.id}`).expect(204);
  });

  it('[POST] /api/v1/payments delete payment with nonexistent payment id', async () => {
    const resp = await httpServer.delete('/api/v1/payments/123').expect(404);
    expect(resp.body.message).toEqual("Payment with id '123' not found");
  });
});
