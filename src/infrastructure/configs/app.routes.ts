const paymentsRoot = '/payments';

export const routesV1 = {
  version: 'api/v1',
  payment: {
    root: paymentsRoot,
    get: `${paymentsRoot}/:paymentId`,
  },
};
