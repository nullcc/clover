import {
  Body,
  Controller,
  HttpStatus,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from '@config/app.routes';
import { Result } from '@src/libs/ddd/domain/utils/result.util';
import { CreatePaymentCommand } from './create-payment.command';
import { CreatePaymentHttpRequest } from './create-payment.request.dto';
import {
  CreatePaymentError,
  InvalidPaymentAccountIdError,
  InvalidRecipientAccountIdError,
  InsufficientBalanceError,
  AmountExceedsTheLimitError,
} from '@modules/payment/errors/payment.errors';
import { PaymentEntity } from '@modules/payment/domain/entities/payment/payment.entity';
import { PaymentHttpResponse } from '@modules/payment/dtos/payment.response.dto';

@ApiTags('Payment')
@Controller(routesV1.version)
export class CreatePaymentHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.payment.root)
  @ApiOperation({ summary: 'Create a payment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PaymentHttpResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(
    @Body() body: CreatePaymentHttpRequest,
  ): Promise<PaymentHttpResponse | void> {
    const command = new CreatePaymentCommand(body);
    const createPaymentResult: Result<PaymentEntity, CreatePaymentError> =
      await this.commandBus.execute(command);
    if (createPaymentResult.isErr) {
      if (
        createPaymentResult.error instanceof InvalidPaymentAccountIdError ||
        createPaymentResult.error instanceof InvalidRecipientAccountIdError ||
        createPaymentResult.error instanceof InsufficientBalanceError ||
        createPaymentResult.error instanceof AmountExceedsTheLimitError
      ) {
        throw new BadRequestException(
          createPaymentResult.error.message,
          (createPaymentResult.error as any).metadata,
        );
      }
    }
    const payment = createPaymentResult.unwrap();
    return new PaymentHttpResponse(payment);
  }
}
