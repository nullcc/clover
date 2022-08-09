import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UserDefinedID } from '@libs/ddd/domain/value-objects/user-defined-id.value-object';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { AccountId } from '@modules/payment/domain/value-objects/account-id.value-object';
import {
  TransferError,
  InsufficientBalanceError,
  AmountExceedsTheLimitError,
} from '@modules/payment/errors/payment.errors';

export interface CreateAccountProps {
  id: AccountId;
  balance: number;
  transferLimit: number;
  phoneNumber: string;
}

export interface AccountProps extends CreateAccountProps {}

export class AccountEntity extends AggregateRoot<AccountProps> {
  protected readonly _id: UserDefinedID;

  static create(create: CreateAccountProps): AccountEntity {
    const id = new UserDefinedID(create.id.value);
    const props: AccountProps = { ...create };
    return new AccountEntity({ id, props });
  }

  pay(value: number): Result<boolean, TransferError> {
    if (value > this.props.transferLimit) {
      return Result.err(new AmountExceedsTheLimitError());
    }
    if (value > this.props.balance) {
      return Result.err(new InsufficientBalanceError());
    }
    this.props.balance -= value;
    return Result.ok(true);
  }

  recipient(value: number): void {
    this.props.balance += value;
  }
}
