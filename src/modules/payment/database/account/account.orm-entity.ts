import { Column, Entity } from 'typeorm';
import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';

@Entity('account')
export class AccountOrmEntity extends TypeormEntityBase {
  constructor(props?: AccountOrmEntity) {
    super(props);
  }

  @Column()
  balance: number;
}
