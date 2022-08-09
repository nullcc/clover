import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import {
  AccountEntity,
  AccountProps,
} from '@modules/payment/domain/entities/account/account.entity';
import { AccountOrmEntity } from './account.orm-entity';
import { AccountId } from '@modules/payment/domain/value-objects/account-id.value-object';
import { UserDefinedID } from '@libs/ddd/domain/value-objects/user-defined-id.value-object';

export class AccountOrmMapper extends OrmMapper<
  AccountEntity,
  AccountOrmEntity
> {
  protected toOrmProps(
    entity: AccountEntity,
  ): OrmEntityProps<AccountOrmEntity> {
    const props = entity.getPropsCopy();
    const ormProps: OrmEntityProps<AccountOrmEntity> = {
      balance: props.balance,
      transferLimit: props.transferLimit,
      phoneNumber: props.phoneNumber,
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: AccountOrmEntity,
  ): EntityProps<AccountProps> {
    const id = new UserDefinedID(ormEntity.id);
    const props: AccountProps = {
      id: new AccountId(ormEntity.id),
      balance: ormEntity.balance,
      transferLimit: ormEntity.transferLimit,
      phoneNumber: ormEntity.phoneNumber,
    };
    return { id, props };
  }
}
