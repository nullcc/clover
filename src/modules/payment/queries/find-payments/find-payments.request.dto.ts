import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { FindPayments } from '@src/interface-adapters/interfaces/payment/find-payments.interface';

export class FindPaymentsRequest implements FindPayments {
  @ApiProperty({
    description: 'Payment account id',
    required: false,
  })
  @IsString()
  readonly paymentAccountId: string;

  @ApiProperty({
    description: 'Receipt account id',
    required: false,
  })
  @IsString()
  readonly receiptAccountId: string;
}

export class FindPaymentsHttpRequest
  extends FindPaymentsRequest
  implements FindPayments {}
