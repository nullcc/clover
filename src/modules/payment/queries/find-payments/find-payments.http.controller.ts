import { Query, Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { Result } from '@src/libs/ddd/domain/utils/result.util';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindPaymentsQuery, FindPaymentQuery } from './find-payments.query';
import { FindPaymentsHttpRequest } from './find-payments.request.dto';
import { PaymentHttpResponse } from '@modules/payment/dtos/payment.response.dto';
import { PaymentEntity } from '@modules/payment/domain/entities/payment/payment.entity';

@ApiTags('Payment')
@Controller(routesV1.version)
export class FindPaymentsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.payment.root)
  @ApiOperation({ summary: 'Find payments' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaymentHttpResponse,
  })
  async findPayments(
    @Query() request: FindPaymentsHttpRequest,
  ): Promise<PaymentHttpResponse[]> {
    const query = new FindPaymentsQuery(request);
    const result: Result<PaymentEntity[]> = await this.queryBus.execute(query);
    return result.unwrap().map((payment) => new PaymentHttpResponse(payment));
  }

  @Get(routesV1.payment.get)
  @ApiOperation({ summary: 'Find a payment' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaymentHttpResponse,
  })
  async findPayment(
    @Param('paymentId') paymentId: string,
  ): Promise<PaymentHttpResponse | void> {
    const query = new FindPaymentQuery({ id: paymentId });
    const result: Result<PaymentEntity, Error> = await this.queryBus.execute(
      query,
    );
    return result.unwrap(
      (payment) => new PaymentHttpResponse(payment),
      (error) => {
        throw error;
      },
    );
  }
}
