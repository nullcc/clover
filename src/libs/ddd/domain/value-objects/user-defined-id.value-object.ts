import { DomainPrimitive } from '@libs/ddd/domain/base-classes/value-object.base';
import { ID } from './id.value-object';

export class UserDefinedID extends ID {
  constructor(value) {
    super(value);
  }

  protected validate({ value }: DomainPrimitive<string>): void {}
}
