import { Module } from '@nestjs/common';
import { createNotificationWhenPaymentIsCreatedProvider } from './providers/notification.providers';

const eventHandlers = [createNotificationWhenPaymentIsCreatedProvider];

@Module({
  imports: [],
  controllers: [],
  providers: [...eventHandlers],
})
export class NotificationModule {}
