import { Provider } from '@nestjs/common';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { CreateNotificationWhenPaymentIsCreatedDomainEventHandler } from '../event-handlers/create-notification-when-payment-is-created.domain-event-handler';
import { NotificationSmsAdapter } from '@infrastructure/adapters/notification-sms.adapter';

export const createNotificationWhenPaymentIsCreatedProvider: Provider = {
  provide: CreateNotificationWhenPaymentIsCreatedDomainEventHandler,
  useFactory: (
    unitOfWork: UnitOfWork,
  ): CreateNotificationWhenPaymentIsCreatedDomainEventHandler => {
    const eventHandler =
      new CreateNotificationWhenPaymentIsCreatedDomainEventHandler(
        unitOfWork,
        new NotificationSmsAdapter(),
      );
    eventHandler.listen();
    return eventHandler;
  },
  inject: [UnitOfWork],
};
