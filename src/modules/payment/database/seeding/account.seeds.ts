import { NonFunctionProperties } from '@libs/types';
import { createdAtUpdatedAtMock } from '@src/libs/test-utils/mocks/generic-model-props.mock';
import { AccountOrmEntity } from '../account/account.orm-entity';

export const accountSeeds: NonFunctionProperties<AccountOrmEntity>[] = [
  {
    ...createdAtUpdatedAtMock,
    id: '6225760008219524',
    balance: 1000,
  },
  {
    ...createdAtUpdatedAtMock,
    id: '5264106268735359',
    balance: 300,
  },
];
