import { CommandHandler } from '@nestjs/cqrs';
import { PaymentRepositoryPort } from '@modules/payment/database/payment/payment.repository.port';
import { AccountRepositoryPort } from '@modules/payment/database/account/account.repository.port';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { CommandHandlerBase } from '@src/libs/ddd/domain/base-classes/command-handler.base';
import { CreatePaymentCommand } from './create-payment.command';
import { PaymentEntity } from '@modules/payment/domain/entities/payment/payment.entity';
import { CreatePaymentError } from '@modules/payment/errors/payment.errors';
import { AccountId } from '@modules/payment/domain/value-objects/account-id.value-object';
import { PaymentAmount } from '@modules/payment/domain/value-objects/payment-amount.value-object';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreatePaymentCommand,
  ): Promise<Result<PaymentEntity, CreatePaymentError>> {
    const paymentRepository: PaymentRepositoryPort =
      this.unitOfWork.getPaymentRepository(command.correlationId);
    const accountRepository: AccountRepositoryPort =
      this.unitOfWork.getAccountRepository(command.correlationId);

    const paymentAccount = await accountRepository.findOneByIdOrThrow(
      command.paymentAccountId,
    );
    const recipientAccount = await accountRepository.findOneByIdOrThrow(
      command.recipientAccountId,
    );
    const amount = new PaymentAmount({
      value: command.amount,
      currency: command.currency,
    });
    const payment = PaymentEntity.create({
      type: command.type,
      paymentAccountId: new AccountId(command.paymentAccountId),
      recipientAccountId: new AccountId(command.recipientAccountId),
      amount: amount,
      comment: command.comment,
    });

    const result = payment.transfer(paymentAccount, recipientAccount, amount);

    return result.unwrap(
      async (res) => {
        await paymentRepository.save(payment);
        await accountRepository.save(paymentAccount);
        await accountRepository.save(recipientAccount);
        return Result.ok(payment);
      },
      (error) => Result.err(error),
    );
  }
}
