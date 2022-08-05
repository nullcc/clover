import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UserDefinedID } from '@libs/ddd/domain/value-objects/user-defined-id.value-object';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { AccountId } from '@modules/payment/domain/value-objects/account-id.value-object';
import { InsufficientBalanceError } from '@modules/payment/errors/payment.errors';

export interface CreateAccountProps {
  id: AccountId;
  balance: number;
}

export interface AccountProps extends CreateAccountProps {}

export class AccountEntity extends AggregateRoot<AccountProps> {
  protected readonly _id: UserDefinedID;

  static create(create: CreateAccountProps): Result<AccountEntity, Error> {
    const id = new UserDefinedID(create.id.value);
    const props: CreateAccountProps = { ...create };
    return AccountEntity.doCreate(id, props);
  }

  static doCreate(
    id: UserDefinedID,
    props: CreateAccountProps,
  ): Result<AccountEntity, Error> {
    const entity = new AccountEntity({ id, props });
    return Result.ok(entity);
  }

  pay(value: number): Result<boolean, InsufficientBalanceError> {
    if (this.props.balance < value) {
      return Result.err(new InsufficientBalanceError());
    }
    this.props.balance -= value;
    return Result.ok(true);
  }

  receipt(value: number): void {
    this.props.balance += value;
  }
}
