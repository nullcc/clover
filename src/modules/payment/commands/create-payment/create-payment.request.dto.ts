import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber } from 'class-validator';
import { CreatePayment } from '@src/interface-adapters/interfaces/payment/create-payment.interface';
import { PaymentType } from '@modules/payment/domain/entities/payment/payment.types';

export class CreatePaymentRequest implements CreatePayment {
  @ApiProperty({
    description: 'Payment type',
  })
  @IsEnum(PaymentType)
  readonly type: PaymentType;

  @ApiProperty({
    description: 'Payment account ID',
  })
  @IsString()
  readonly paymentAccountId: string;

  @ApiProperty({
    description: 'recipient account ID',
  })
  @IsString()
  readonly recipientAccountId: string;

  @ApiProperty({
    description: 'Amount',
  })
  @IsNumber()
  readonly amount: number;

  @ApiProperty({
    description: 'Currency',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Comment',
  })
  @IsString()
  readonly comment: string;
}

export class CreatePaymentHttpRequest
  extends CreatePaymentRequest
  implements CreatePayment {}
