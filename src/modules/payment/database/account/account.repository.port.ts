import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import {
  AccountEntity,
  AccountProps,
} from '@modules/payment/domain/entities/account/account.entity';

export interface AccountRepositoryPort extends RepositoryPort<AccountEntity, AccountProps> {}
