export interface CreatePayment {
  readonly type: string;
  readonly paymentAccountId: string;
  readonly recipientAccountId: string;
  readonly amount: number;
  readonly currency: string;
  readonly comment: string;
}
