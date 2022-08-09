import { ExceptionBase } from '@src/libs/exceptions';

export type CreatePaymentError =
  | InvalidPaymentAccountIdError
  | InvalidRecipientAccountIdError
  | InsufficientBalanceError
  | AmountExceedsTheLimitError;

export type TransferError =
  | InsufficientBalanceError
  | AmountExceedsTheLimitError;

export type DeletePaymentError = PaymentNotFoundError;

export class InvalidPaymentAccountIdError extends ExceptionBase {
  static readonly message = 'Invalid payment account id';

  public readonly code = 'PAYMENT.INVALID_PAYMENT_ACCOUNT_ID';

  constructor(metadata?: unknown) {
    super(InvalidPaymentAccountIdError.message, metadata);
  }
}

export class InvalidRecipientAccountIdError extends ExceptionBase {
  static readonly message = 'Invalid recipient account id';

  public readonly code = 'PAYMENT.INVALID_recipient_ACCOUNT_ID';

  constructor(metadata?: unknown) {
    super(InvalidRecipientAccountIdError.message, metadata);
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

export class PaymentNotFoundError extends ExceptionBase {
  static readonly message = 'Payment not found';

  public readonly code = 'PAYMENT.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(PaymentNotFoundError.message, metadata);
  }
}
