import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface PaymentAmountProps {
  value: number;
  currency: string;
}

export class PaymentAmount extends ValueObject<PaymentAmountProps> {
  static readonly CURRENCY_MAP: Map<string, string> = new Map([
    ['USD', 'USD'],
    ['RMB', 'RMB'],
    ['JPY', 'JPY'],
    ['HKD', 'HKD'],
    ['EUR', 'EUR'],
  ]);

  get value(): number {
    return this.props.value;
  }

  get currency(): string {
    return this.props.currency;
  }

  protected validate(props: PaymentAmountProps): void {
    if (props.value <= 0) {
      throw new ArgumentInvalidException(
        'Payment amount must be greater than 0',
      );
    }
    if (!PaymentAmount.CURRENCY_MAP.has(props.currency)) {
      throw new ArgumentInvalidException(
        `Unsupported currency: ${props.currency}`,
      );
    }
  }
}
