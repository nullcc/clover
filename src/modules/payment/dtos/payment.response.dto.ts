import { ApiProperty } from '@nestjs/swagger';
import { PaymentEntity } from '@modules/payment/domain/entities/payment/payment.entity';
import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base';
import { Payment } from '@src/interface-adapters/interfaces/payment/payment.interface';
import { PaymentType } from '@modules/payment/domain/entities/payment/payment.types';

export class PaymentResponse extends ResponseBase implements Payment {
  constructor(payment: PaymentEntity) {
    super(payment);
    const props = payment.getPropsCopy();
    this.type = props.type;
    this.paymentAccountId = props.paymentAccountId.value;
    this.recipientAccountId = props.recipientAccountId.value;
    this.amount = props.amount.value;
    this.currency = props.amount.currency;
    this.comment = props.comment;
  }

  @ApiProperty({
    description: 'Payment type',
  })
  type: PaymentType;

  @ApiProperty({
    description: 'Payment account Id',
  })
  paymentAccountId: string;

  @ApiProperty({
    description: 'recipient account Id',
  })
  recipientAccountId: string;

  @ApiProperty({
    description: 'Amount',
  })
  amount: number;

  @ApiProperty({
    description: 'Amount',
  })
  currency: string;

  @ApiProperty({
    description: 'Comment',
  })
  comment: string;
}

export class PaymentHttpResponse extends PaymentResponse implements Payment {}
