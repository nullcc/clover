import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { PaymentOrmEntity } from './database/payment/payment.orm-entity';
import { PaymentRepository } from './database/payment/payment.repository';
import { AccountOrmEntity } from './database/account/account.orm-entity';
import { AccountRepository } from './database/account/account.repository';
import { CreatePaymentHttpController } from './commands/create-payment/create-payment.http.controller';
import { DeleteLeaseHttpController } from './commands/delete-payment/delete-payment.http.controller';
import { FindPaymentsHttpController } from './queries/find-payments/find-payments.http.controller';
import { CreatePaymentService } from './commands/create-payment/create-payment.service';
import { DeleteLeaseService } from './commands/delete-payment/delete-payment.service';
import {
  FindPaymentsQueryHandler,
  FindPaymentQueryHandler,
} from './queries/find-payments/find-payments.query-handler';

const httpControllers = [
  CreatePaymentHttpController,
  DeleteLeaseHttpController,
  FindPaymentsHttpController,
];

const repositories = [PaymentRepository, AccountRepository];

const commandHandlers = [CreatePaymentService, DeleteLeaseService];

const queryHandlers = [FindPaymentsQueryHandler, FindPaymentQueryHandler];

const adapters = [];

const serviceProviders = [];

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
