import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import {
  PaymentProps,
  PaymentEntity,
} from '@modules/payment/domain/entities/payment/payment.entity';
import { PaymentOrmEntity } from './payment.orm-entity';
import { AccountId } from '@modules/payment/domain/value-objects/account-id.value-object';
import { PaymentAmount } from '@modules/payment/domain/value-objects/payment-amount.value-object';

export class PaymentOrmMapper extends OrmMapper<
  PaymentEntity,
  PaymentOrmEntity
> {
  protected toOrmProps(
    entity: PaymentEntity,
  ): OrmEntityProps<PaymentOrmEntity> {
    const props = entity.getPropsCopy();
    const ormProps: OrmEntityProps<PaymentOrmEntity> = {
      type: props.type,
      paymentAccountId: props.paymentAccountId.value,
      receiptAccountId: props.receiptAccountId.value,
      amount: props.amount.value,
      currency: props.amount.currency,
      comment: props.comment,
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: PaymentOrmEntity,
  ): EntityProps<PaymentProps> {
    const id = new UUID(ormEntity.id);
    const props: PaymentProps = {
      type: ormEntity.type,
      paymentAccountId: new AccountId(ormEntity.paymentAccountId),
      receiptAccountId: new AccountId(ormEntity.receiptAccountId),
      amount: new PaymentAmount({
        value: ormEntity.amount,
        currency: ormEntity.currency,
      }),
      comment: ormEntity.comment,
    };
    return { id, props };
  }
}
