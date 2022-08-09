import { Module } from '@nestjs/common';
import {
  createNotificationWhenPaymentIsCreatedProvider,
  ServiceProviders,
} from './providers/notification.providers';
import { NotificationSmsAdapter } from '@infrastructure/adapters/notification-sms.adapter';

const eventHandlers = [createNotificationWhenPaymentIsCreatedProvider];

const serviceProviders = [
  {
    provide: ServiceProviders.NOTIFICATION_ADAPTER,
    useClass: NotificationSmsAdapter,
  },
];

@Module({
  imports: [],
  controllers: [],
  providers: [...eventHandlers, ...serviceProviders],
})
export class NotificationModule {}
