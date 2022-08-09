import { DomainEvent, DomainEventProps } from '@libs/ddd/domain/domain-events';

// DomainEvent is a plain object with properties
export class PaymentCreatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<PaymentCreatedDomainEvent>) {
    super(props);
    this.paymentAccountId = props.paymentAccountId;
    this.recipientAccountId = props.recipientAccountId;
    this.amount = props.amount;
    this.currency = props.currency;
    this.payerPhoneNumber = props.payerPhoneNumber;
    this.recipientPhoneNumber = props.recipientPhoneNumber;
  }

  readonly paymentAccountId: string;

  readonly recipientAccountId: string;

  readonly amount: number;

  readonly currency: string;

  readonly payerPhoneNumber: string;

  readonly recipientPhoneNumber: string;
}
