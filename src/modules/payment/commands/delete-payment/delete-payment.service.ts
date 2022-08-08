import { CommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { PaymentRepositoryPort } from '@modules/payment/database/payment/payment.repository.port';
import { CommandHandlerBase } from '@src/libs/ddd/domain/base-classes/command-handler.base';
import { DeletePaymentCommand } from './delete-payment.command';
import { DeletePaymentError } from '@modules/payment/errors/payment.errors';

@CommandHandler(DeletePaymentCommand)
export class DeleteLeaseService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: DeletePaymentCommand,
  ): Promise<Result<void, DeletePaymentError>> {
    const paymentRepository: PaymentRepositoryPort =
      this.unitOfWork.getPaymentRepository(command.correlationId);
    const payment = await paymentRepository.findOneByIdOrThrow(
      command.paymentId,
    );
    await paymentRepository.delete(payment);
    return Result.ok(undefined);
  }
}
