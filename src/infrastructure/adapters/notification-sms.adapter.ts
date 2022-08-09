import { Injectable, ConsoleLogger } from '@nestjs/common';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { AdapterBase } from '@libs/ddd/infrastructure/adapter/base-classes/adapter.base';
import {
  NotificationAdapterPort,
  CannotSendNotificationError,
  ReceiverNotFoundError,
  PayloadTooLargeError,
} from '@modules/notification/adapters/notification.adapter.port';

@Injectable()
export class NotificationSmsAdapter
  extends AdapterBase
  implements NotificationAdapterPort
{
  constructor() {
    super(new ConsoleLogger('NotificationAdapter'));
  }

  async notify(
    receiver: string,
    message: string,
  ): Promise<Result<string, CannotSendNotificationError>> {
    this.logger.log(`Sending SMS to ${receiver}, message: ${message}.`);
    try {
      const notificationId = 'xxx';
      return Result.ok(notificationId);
    } catch (err) {
      if (err.code === ReceiverNotFoundError.message) {
        return Result.err(new ReceiverNotFoundError());
      }
      if (err.code === PayloadTooLargeError.message) {
        return Result.err(new PayloadTooLargeError());
      }
    }
  }
}
