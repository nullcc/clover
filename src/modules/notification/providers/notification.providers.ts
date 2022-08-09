import { Provider } from '@nestjs/common';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { CreateNotificationWhenPaymentIsCreatedDomainEventHandler } from '../event-handlers/create-notification-when-payment-is-created.domain-event-handler';
import { NotificationAdapterPort } from '@modules/notification/adapters/notification.adapter.port';

export const ServiceProviders = {
  NOTIFICATION_ADAPTER: 'NOTIFICATION_ADAPTER',
};

export const createNotificationWhenPaymentIsCreatedProvider: Provider = {
  provide: CreateNotificationWhenPaymentIsCreatedDomainEventHandler,
  useFactory: (
    unitOfWork: UnitOfWork,
    notificationAdapter: NotificationAdapterPort,
  ): CreateNotificationWhenPaymentIsCreatedDomainEventHandler => {
    const eventHandler =
      new CreateNotificationWhenPaymentIsCreatedDomainEventHandler(
        unitOfWork,
        notificationAdapter,
      );
    eventHandler.listen();
    return eventHandler;
  },
  inject: [UnitOfWork, ServiceProviders.NOTIFICATION_ADAPTER],
};
