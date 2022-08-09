import { PaymentType } from '@modules/payment/domain/entities/payment/payment.types';
import { NonFunctionProperties } from '@libs/types';
import { createdAtUpdatedAtMock } from '@src/libs/test-utils/mocks/generic-model-props.mock';
import { PaymentOrmEntity } from '../payment/payment.orm-entity';

export const paymentSeeds: NonFunctionProperties<PaymentOrmEntity>[] = [
  {
    ...createdAtUpdatedAtMock,
    id: '675b5c6f-52de-474f-aba6-f7717844a5e8',
    type: PaymentType.PrivateToPrivate,
    paymentAccountId: '6225760008219524',
    recipientAccountId: '5264106268735359',
    amount: 100,
    currency: 'USD',
    comment: 'travel fee',
  },
  {
    ...createdAtUpdatedAtMock,
    id: 'a877f456-3284-42d1-b426-4c5f44eca561',
    type: PaymentType.PrivateToPublic,
    paymentAccountId: '6225760008219524',
    recipientAccountId: '5264106268735359',
    amount: 200,
    currency: 'RMB',
    comment: 'travel fee',
  },
];
