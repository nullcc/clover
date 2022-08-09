import { PaymentCreatedDomainEvent } from '@modules/payment/domain/events/payment-created.domain-event';
import { DomainEventHandler } from '@libs/ddd/domain/domain-events';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { NotificationAdapterPort } from '@modules/notification/adapters/notification.adapter.port';

export class CreateNotificationWhenPaymentIsCreatedDomainEventHandler extends DomainEventHandler {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    protected readonly notificationAdapter: NotificationAdapterPort,
  ) {
    super(PaymentCreatedDomainEvent);
  }

  // Handle a Domain Event by perform changes to other aggregates (inside the same Domain).
  async handle(event: PaymentCreatedDomainEvent): Promise<void> {
    const messageForPayer = `You account [${event.paymentAccountId}] has transferred payment ${event.currency} ${event.amount} to [${event.recipientAccountId}]`;
    const messageForRecipient = `You account [${event.recipientAccountId}] has received payment ${event.currency} ${event.amount} from [${event.paymentAccountId}]`;
    await this.notificationAdapter.notify(
      event.payerPhoneNumber,
      messageForPayer,
    );
    await this.notificationAdapter.notify(
      event.recipientPhoneNumber,
      messageForRecipient,
    );
  }
}
