/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { CreateEntityProps } from '@libs/ddd/domain/base-classes/entity.base';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { TypeormEntityBase } from './typeorm.entity.base';

export type OrmEntityProps<OrmEntity> = Omit<
  OrmEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface EntityProps<EntityProps> {
  id: ID;
  props: EntityProps;
}

export type EntityConstructor<Entity extends AggregateRoot<unknown>> = new (
  props: CreateEntityProps<any>,
) => Entity | DomainEntityConstructorFactory;

export type OrmEntityConstructor<OrmEntity> = new (props: any) => OrmEntity;

export abstract class OrmMapper<
  Entity extends AggregateRoot<unknown>,
  OrmEntity,
> {
  constructor(
    private entityConstructor: EntityConstructor<Entity>,
    private ormEntityConstructor: OrmEntityConstructor<OrmEntity>,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): EntityProps<unknown>;

  protected abstract toOrmProps(entity: Entity): OrmEntityProps<OrmEntity>;

  toDomainEntity(ormEntity: OrmEntity): Entity {
    const { id, props } = this.toDomainProps(ormEntity);
    const ormEntityBase: TypeormEntityBase =
      ormEntity as unknown as TypeormEntityBase;
    let entityConstructor;
    const createProps = {
      id,
      props,
      createdAt: new DateVO(ormEntityBase.createdAt),
      updatedAt: new DateVO(ormEntityBase.updatedAt),
    };
    if (this.entityConstructor['type'] === 'factory') {
      const domainEntityConstructorFactory = this
        .entityConstructor as typeof DomainEntityConstructorFactory;
      entityConstructor = domainEntityConstructorFactory.create(createProps);
      return new entityConstructor(createProps);
    }
    entityConstructor = this.entityConstructor as new (
      props: CreateEntityProps<any>,
    ) => Entity;
    return new entityConstructor(createProps);
  }

  toOrmEntity(entity: Entity): OrmEntity {
    const props = this.toOrmProps(entity);
    return new this.ormEntityConstructor({
      ...props,
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt.value,
    });
  }
}

export class DomainEntityConstructorFactory {
  static readonly type = 'factory';

  static create<Entity, EntityProps>(
    props: CreateEntityProps<EntityProps>,
  ): new (props: CreateEntityProps<EntityProps>) => Entity {
    throw new Error('Not implemented!');
  }
}
