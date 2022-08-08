import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PaymentOrmEntity } from '../payment/payment.orm-entity';
import { paymentSeeds } from './payment.seeds';

export default class CreatePayments implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(PaymentOrmEntity)
      .values(paymentSeeds)
      .execute();
  }
}
