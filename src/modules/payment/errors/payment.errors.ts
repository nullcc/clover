import { ExceptionBase } from '@src/libs/exceptions';

export type CreatePaymentError =
  | InvalidPaymentAccountIdError
  | InvalidReceiptAccountIdError
  | InsufficientBalanceError
  | AmountExceedsTheLimitError
  | PaymentIsTooFrequentError;

export class InvalidPaymentAccountIdError extends ExceptionBase {
  static readonly message = 'Invalid payment account id';

  public readonly code = 'PAYMENT.INVALID_PAYMENT_ACCOUNT_ID';

  constructor(metadata?: unknown) {
    super(InvalidPaymentAccountIdError.message, metadata);
  }
}

export class InvalidReceiptAccountIdError extends ExceptionBase {
  static readonly message = 'Invalid receipt account id';

  public readonly code = 'PAYMENT.INVALID_RECEIPT_ACCOUNT_ID';

  constructor(metadata?: unknown) {
    super(InvalidReceiptAccountIdError.message, metadata);
  }
}

export class InsufficientBalanceError extends ExceptionBase {
  static readonly message = 'Insufficient balance';

  public readonly code = 'PAYMENT.INSUFFICIENT_BALANCE';

  constructor(metadata?: unknown) {
    super(InsufficientBalanceError.message, metadata);
  }
}

export class AmountExceedsTheLimitError extends ExceptionBase {
  static readonly message = 'Amount exceeds the limit';

  public readonly code = 'PAYMENT.AMOUNT_EXCEEDS_THE_LIMIT';

  constructor(metadata?: unknown) {
    super(AmountExceedsTheLimitError.message, metadata);
  }
}

export class PaymentIsTooFrequentError extends ExceptionBase {
  static readonly message = 'Payment is too frequent';

  public readonly code = 'PAYMENT.PAYMENT_IS_TOO_FREQUENT';

  constructor(metadata?: unknown) {
    super(PaymentIsTooFrequentError.message, metadata);
  }
}
