import { Query } from '@libs/ddd/domain/base-classes/query-handler.base';

export class FindPaymentsQuery extends Query {
  constructor(props: FindPaymentsQuery) {
    super();
    this.paymentAccountId = props.paymentAccountId;
    this.receiptAccountId = props.receiptAccountId;
  }

  readonly paymentAccountId: string;

  readonly receiptAccountId: string;
}

export class FindPaymentQuery extends Query {
  constructor(props: FindPaymentQuery) {
    super();
    this.id = props.id;
  }

  readonly id: string;
}
