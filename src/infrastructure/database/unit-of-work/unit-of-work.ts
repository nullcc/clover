import { Injectable } from '@nestjs/common';
import { TypeormUnitOfWork } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm-unit-of-work';
import { PaymentOrmEntity } from '@modules/payment/database/payment/payment.orm-entity';
import { PaymentRepository } from '@modules/payment/database/payment/payment.repository';
import { AccountOrmEntity } from '@modules/payment/database/account/account.orm-entity';
import { AccountRepository } from '@modules/payment/database/account/account.repository';

@Injectable()
export class UnitOfWork extends TypeormUnitOfWork {
  // Add new repositories below to use this generic UnitOfWork

  // Convert TypeOrm Repository to a Domain Repository
  getPaymentRepository(correlationId: string): PaymentRepository {
    return new PaymentRepository(
      this.getOrmRepository(PaymentOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  getAccountRepository(correlationId: string): AccountRepository {
    return new AccountRepository(
      this.getOrmRepository(AccountOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }
}
