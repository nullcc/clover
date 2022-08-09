import { NonFunctionProperties } from '@libs/types';
import { createdAtUpdatedAtMock } from '@src/libs/test-utils/mocks/generic-model-props.mock';
import { AccountOrmEntity } from '../account/account.orm-entity';

export const accountSeeds: NonFunctionProperties<AccountOrmEntity>[] = [
  {
    ...createdAtUpdatedAtMock,
    id: '6225760008219524',
    balance: 1000,
    transferLimit: 2000,
    phoneNumber: '123456',
  },
  {
    ...createdAtUpdatedAtMock,
    id: '5264106268735359',
    balance: 300,
    transferLimit: 3000,
    phoneNumber: '654321',
  },
];
