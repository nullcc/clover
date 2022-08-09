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
    description: 'recipient account id',
    required: false,
  })
  @IsString()
  readonly recipientAccountId: string;
}

export class FindPaymentsHttpRequest
  extends FindPaymentsRequest
  implements FindPayments {}
