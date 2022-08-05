import { Inject } from '@nestjs/common';
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
import { ServiceProvider } from '@modules/payment/providers/service.provider';
import { NotificationAdapterPort } from '@modules/payment/adapters/notification.adapter.port';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentService extends CommandHandlerBase {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    @Inject(ServiceProvider.NOTIFICATION_SERVICE)
    protected readonly notificationAdapter: NotificationAdapterPort,
  ) {
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
    const receiptAccount = await accountRepository.findOneByIdOrThrow(
      command.receiptAccountId,
    );
    const payResult = paymentAccount.pay(command.amount);
    receiptAccount.receipt(command.amount);
    if (payResult.isErr) {
      return Result.err(payResult.error);
    }
    const result = PaymentEntity.create({
      type: command.type,
      paymentAccountId: new AccountId(command.paymentAccountId),
      receiptAccountId: new AccountId(command.receiptAccountId),
      amount: new PaymentAmount({
        value: command.amount,
        currency: command.currency,
      }),
      comment: command.comment,
    });
    await this.notificationAdapter.notify('aaa', 'bbb');
    return result.unwrap(
      async (payment) => {
        await paymentRepository.save(payment);
        await accountRepository.save(paymentAccount);
        await accountRepository.save(receiptAccount);
        return Result.ok(payment);
      },
      (error) => Result.err(error),
    );
  }
}
