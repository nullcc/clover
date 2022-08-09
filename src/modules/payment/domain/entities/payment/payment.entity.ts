import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { TransferError } from '@modules/payment/errors/payment.errors';
import { PaymentType } from './payment.types';
import { AccountId } from '@modules/payment/domain/value-objects/account-id.value-object';
import { PaymentAmount } from '@modules/payment/domain/value-objects/payment-amount.value-object';
import { AccountEntity } from '@modules/payment/domain/entities/account/account.entity';
import { PaymentCreatedDomainEvent } from '@modules/payment/domain/events/payment-created.domain-event';

export interface CreatePaymentProps {
  type: PaymentType;
  paymentAccountId: AccountId;
  recipientAccountId: AccountId;
  amount: PaymentAmount;
  comment: string;
}

export interface PaymentProps extends CreatePaymentProps {}

export class PaymentEntity extends AggregateRoot<PaymentProps> {
  protected readonly _id: UUID;

  static create(create: CreatePaymentProps): PaymentEntity {
    const id = UUID.generate();
    const props: PaymentProps = { ...create };
    return new PaymentEntity({ id, props });
  }

  transfer(
    paymentAccount: AccountEntity,
    recipientAccount: AccountEntity,
    amount: PaymentAmount,
  ): Result<boolean, TransferError> {
    const paymentResult = paymentAccount.pay(amount.value);
    if (paymentResult.isErr) {
      return Result.err(paymentResult.error);
    }
    recipientAccount.recipient(amount.value);
    this.addEvent(
      new PaymentCreatedDomainEvent({
        aggregateId: this.id.value,
        paymentAccountId: paymentAccount.id.getRawProps(),
        recipientAccountId: recipientAccount.id.getRawProps(),
        amount: amount.getRawProps().value,
        currency: amount.getRawProps().currency,
        payerPhoneNumber: paymentAccount.getPropsCopy().phoneNumber,
        recipientPhoneNumber: recipientAccount.getPropsCopy().phoneNumber,
      }),
    );
    return Result.ok(true);
  }
}
