import {
  Command,
  CommandProps,
} from '@src/libs/ddd/domain/base-classes/command.base';
import { PaymentType } from '@modules/payment/domain/entities/payment/payment.types';

export class CreatePaymentCommand extends Command {
  constructor(props: CommandProps<CreatePaymentCommand>) {
    super(props);
    this.type = props.type;
    this.paymentAccountId = props.paymentAccountId;
    this.receiptAccountId = props.receiptAccountId;
    this.amount = props.amount;
    this.currency = props.currency;
    this.comment = props.comment;
  }

  readonly type: PaymentType;

  readonly paymentAccountId: string;

  readonly receiptAccountId: string;

  readonly amount: number;

  readonly currency: string;

  readonly comment: string;
}
