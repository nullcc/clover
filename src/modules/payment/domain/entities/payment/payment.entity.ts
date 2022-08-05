import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { CreatePaymentError } from '@modules/payment/errors/payment.errors';
import { PaymentType } from './payment.types';
import { AccountId } from '@modules/payment/domain/value-objects/account-id.value-object';
import { PaymentAmount } from '@modules/payment/domain/value-objects/payment-amount.value-object';

export interface CreatePaymentProps {
  type: PaymentType;
  paymentAccountId: AccountId;
  receiptAccountId: AccountId;
  amount: PaymentAmount;
  comment: string;
}

export interface PaymentProps extends CreatePaymentProps {}

export class PaymentEntity extends AggregateRoot<PaymentProps> {
  protected readonly _id: UUID;

  static create(
    create: CreatePaymentProps,
  ): Result<PaymentEntity, CreatePaymentError> {
    const id = UUID.generate();
    const props: CreatePaymentProps = { ...create };
    return PaymentEntity.doCreate(id, props);
  }

  static doCreate(
    id: UUID,
    props: CreatePaymentProps,
  ): Result<PaymentEntity, CreatePaymentError> {
    const entity = new PaymentEntity({ id, props });
    return Result.ok(entity);
  }
}
