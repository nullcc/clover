import {
  Param,
  Controller,
  HttpStatus,
  HttpCode,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { routesV1 } from '@config/app.routes';
import { Result } from '@src/libs/ddd/domain/utils/result.util';
import { DeletePaymentCommand } from './delete-payment.command';
import {
  DeletePaymentError,
  PaymentNotFoundError,
} from '@modules/payment/errors/payment.errors';

@ApiTags('Payment')
@Controller(routesV1.version)
export class DeleteLeaseHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(routesV1.payment.delete)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a payment' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async delete(@Param('paymentId') paymentId: string): Promise<void> {
    const command = new DeletePaymentCommand({ paymentId });
    const result: Result<void, DeletePaymentError> =
      await this.commandBus.execute(command);
    result.unwrap(
      (_) => _,
      (error) => {
        if (error instanceof PaymentNotFoundError)
          throw new NotFoundException(error.message);
        throw error;
      },
    );
  }
}
