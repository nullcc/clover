import { Column, Entity } from 'typeorm';
import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { PaymentType } from '@modules/payment/domain/entities/payment/payment.types';

@Entity('payment')
export class PaymentOrmEntity extends TypeormEntityBase {
  constructor(props?: PaymentOrmEntity) {
    super(props);
  }

  @Column()
  type: PaymentType;

  @Column()
  paymentAccountId: string;

  @Column()
  receiptAccountId: string;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  comment: string;
}
