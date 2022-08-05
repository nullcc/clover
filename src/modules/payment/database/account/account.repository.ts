import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, ConsoleLogger } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { AccountOrmEntity } from './account.orm-entity';
import { AccountRepositoryPort } from './account.repository.port';
import { AccountOrmMapper } from './account.orm-mapper';
import { NotFoundException } from '@libs/exceptions';
import {
  AccountEntity,
  AccountProps,
} from '@modules/payment/domain/entities/account/account.entity';

@Injectable()
export class AccountRepository
  extends TypeormRepositoryBase<AccountEntity, AccountProps, AccountOrmEntity>
  implements AccountRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly accountRepository: Repository<AccountOrmEntity>,
  ) {
    super(
      accountRepository,
      new AccountOrmMapper(AccountEntity, AccountOrmEntity),
      new ConsoleLogger('AccountRepository'),
    );
  }

  async findOneByIdOrThrow(id: string): Promise<AccountEntity> {
    const account = await this.findOneById(id);
    if (!account) {
      throw new NotFoundException(`Account with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(account);
  }

  protected prepareQuery(
    params: QueryParams<AccountProps>,
  ): WhereCondition<AccountOrmEntity> {
    const where: QueryParams<AccountOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }

  private async findOneById(id: string): Promise<AccountOrmEntity | undefined> {
    const account = await this.accountRepository.findOne({
      where: { id },
    });
    return account;
  }
}
