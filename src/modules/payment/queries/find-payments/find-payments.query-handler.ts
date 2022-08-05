import { PaymentRepository } from '@modules/payment/database/payment/payment.repository';
import { QueryHandlerBase } from '@src/libs/ddd/domain/base-classes/query-handler.base';
import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { FindPaymentsQuery, FindPaymentQuery } from './find-payments.query';
import { PaymentEntity } from '@modules/payment/domain/entities/payment/payment.entity';

@QueryHandler(FindPaymentsQuery)
export class FindPaymentsQueryHandler extends QueryHandlerBase {
  constructor(private readonly paymentRepository: PaymentRepository) {
    super();
  }

  async handle(query: FindPaymentsQuery): Promise<Result<PaymentEntity[]>> {
    const payments = await this.paymentRepository.findPayments(query);
    return Result.ok(payments);
  }
}

@QueryHandler(FindPaymentQuery)
export class FindPaymentQueryHandler extends QueryHandlerBase {
  constructor(private readonly paymentRepository: PaymentRepository) {
    super();
  }

  async handle(query: FindPaymentQuery): Promise<Result<PaymentEntity>> {
    const payment = await this.paymentRepository.findOneByIdOrThrow(query.id);
    return Result.ok(payment);
  }
}
