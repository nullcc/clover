import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import {
  PaymentEntity,
  PaymentProps,
} from '@modules/payment/domain/entities/payment/payment.entity';

export interface PaymentRepositoryPort extends RepositoryPort<PaymentEntity, PaymentProps> {}
