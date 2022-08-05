import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { PaymentOrmEntity } from './database/payment/payment.orm-entity';
import { PaymentRepository } from './database/payment/payment.repository';
import { AccountOrmEntity } from './database/account/account.orm-entity';
import { AccountRepository } from './database/account/account.repository';
import { CreatePaymentHttpController } from './commands/create-payment/create-payment.http.controller';
import { FindPaymentsHttpController } from './queries/find-payments/find-payments.http.controller';
import { CreatePaymentService } from './commands/create-payment/create-payment.service';
import {
  FindPaymentsQueryHandler,
  FindPaymentQueryHandler,
} from './queries/find-payments/find-payments.query-handler';
import { NotificationSmsAdapter } from '@infrastructure/adapters/notification-sms.adapter';
import { ServiceProvider } from './providers/service.provider';

const httpControllers = [
  CreatePaymentHttpController,
  FindPaymentsHttpController,
];

const repositories = [PaymentRepository, AccountRepository];

const commandHandlers = [CreatePaymentService];

const queryHandlers = [FindPaymentsQueryHandler, FindPaymentQueryHandler];

const adapters = [];

const serviceProviders = [
  {
    provide: ServiceProvider.NOTIFICATION_SERVICE,
    useValue: new NotificationSmsAdapter(),
  },
];

const schedulers = [];

const customProviders = [];

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentOrmEntity, AccountOrmEntity]),
    CqrsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [...httpControllers],
  providers: [
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...schedulers,
    ...adapters,
    ...serviceProviders,
    ...customProviders,
  ],
})
export class PaymentModule {}
