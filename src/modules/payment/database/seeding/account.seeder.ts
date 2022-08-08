import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { AccountOrmEntity } from '../account/account.orm-entity';
import { accountSeeds } from './account.seeds';

export default class CreateAccounts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(AccountOrmEntity)
      .values(accountSeeds)
      .execute();
  }
}
