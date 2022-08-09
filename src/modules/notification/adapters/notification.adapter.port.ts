import { Result } from '@libs/ddd/domain/utils/result.util';
import { ExceptionBase } from '@libs/exceptions';

export type CannotSendNotificationError =
  | ReceiverNotFoundError
  | PayloadTooLargeError;

export class ReceiverNotFoundError extends ExceptionBase {
  static readonly message = 'Receiver not found';

  public readonly code = 'NOTIFICATION.RECEIVER_NOT_FOUND';

  constructor(metadata?: unknown) {
    super(ReceiverNotFoundError.message, metadata);
  }
}

export class PayloadTooLargeError extends ExceptionBase {
  static readonly message = 'Payload too large';

  public readonly code = 'NOTIFICATION.PAYLOAD_TOO_LARGE';

  constructor(metadata?: unknown) {
    super(PayloadTooLargeError.message, metadata);
  }
}

export interface NotificationAdapterPort {
  notify(
    receiver: string,
    message: string,
  ): Promise<Result<string, CannotSendNotificationError>>;
}
