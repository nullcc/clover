import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { getApplication, getHttpServer } from '../../jestSetupAfterEnv';

describe('Find payments (e2e)', () => {
  let app: INestApplication;
  let httpServer: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    app = await getApplication();
    httpServer = getHttpServer(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('[GET] /api/v1/payments get payments', () => {
    return httpServer
      .get('/api/v1/payments')
      .expect(200)
      .expect([
        {
          id: '675b5c6f-52de-474f-aba6-f7717844a5e8',
          createdAt: '2020-08-07T12:29:11.214Z',
          updatedAt: '2020-08-07T12:29:11.214Z',
          type: 'PrivateToPrivate',
          paymentAccountId: '6225760008219524',
          recipientAccountId: '5264106268735359',
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
          recipientAccountId: '5264106268735359',
          amount: 200,
          currency: 'RMB',
          comment: 'travel fee',
        },
      ]);
  });

  it('[GET] /api/v1/payments/{paymentId} get payment', () => {
    return httpServer
      .get('/api/v1/payments/675b5c6f-52de-474f-aba6-f7717844a5e8')
      .expect(200)
      .expect({
        id: '675b5c6f-52de-474f-aba6-f7717844a5e8',
        createdAt: '2020-08-07T12:29:11.214Z',
        updatedAt: '2020-08-07T12:29:11.214Z',
        type: 'PrivateToPrivate',
        paymentAccountId: '6225760008219524',
        recipientAccountId: '5264106268735359',
        amount: 100,
        currency: 'USD',
        comment: 'travel fee',
      });
  });

  it('[GET] /api/v1/payments/{paymentId} get payment with nonexistent payment id', async () => {
    const resp = await httpServer.get('/api/v1/payments/foobar').expect(404);
    expect(resp.body.message).toEqual("Payment with id 'foobar' not found");
  });
});
