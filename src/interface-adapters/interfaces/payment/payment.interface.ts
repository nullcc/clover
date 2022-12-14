import { ModelBase } from '@libs/ddd/interface-adapters/interfaces/model.base.interface';

export interface Payment extends ModelBase {
  type: string;
  paymentAccountId: string;
  recipientAccountId: string;
  amount: number;
  currency: string;
  comment: string;
}
