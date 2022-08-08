import {
  Command,
  CommandProps,
} from '@src/libs/ddd/domain/base-classes/command.base';

export class DeletePaymentCommand extends Command {
  constructor(props: CommandProps<DeletePaymentCommand>) {
    super(props);
    this.paymentId = props.paymentId;
  }

  readonly paymentId: string;
}
