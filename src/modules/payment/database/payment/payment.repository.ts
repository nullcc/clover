import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, ConsoleLogger } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { PaymentOrmEntity } from './payment.orm-entity';
import { PaymentRepositoryPort } from './payment.repository.port';
import { PaymentOrmMapper } from './payment.orm-mapper';
import { FindPaymentsQuery } from '@modules/payment/queries/find-payments/find-payments.query';
import { removeUndefinedProps } from '@src/libs/utils/remove-undefined-props.util';
import { NotFoundException } from '@libs/exceptions';
import {
  PaymentEntity,
  PaymentProps,
} from '@modules/payment/domain/entities/payment/payment.entity';

@Injectable()
export class PaymentRepository
  extends TypeormRepositoryBase<PaymentEntity, PaymentProps, PaymentOrmEntity>
  implements PaymentRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(PaymentOrmEntity)
    private readonly paymentRepository: Repository<PaymentOrmEntity>,
  ) {
    super(
      paymentRepository,
      new PaymentOrmMapper(PaymentEntity, PaymentOrmEntity),
      new ConsoleLogger('PaymentRepository'),
    );
  }

  async findPayments(query: FindPaymentsQuery): Promise<PaymentEntity[]> {
    const where: QueryParams<PaymentOrmEntity> = removeUndefinedProps(query);
    const payments = await this.repository.find({ where });
    return payments.map((payment) => this.mapper.toDomainEntity(payment));
  }

  async findOneByIdOrThrow(id: string): Promise<PaymentEntity> {
    const payment = await this.findOneById(id);
    if (!payment) {
      throw new NotFoundException(`Payment with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(payment);
  }

  protected prepareQuery(
    params: QueryParams<PaymentProps>,
  ): WhereCondition<PaymentOrmEntity> {
    const where: QueryParams<PaymentOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }

  private async findOneById(id: string): Promise<PaymentOrmEntity | undefined> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
    });

    return payment;
  }
}
