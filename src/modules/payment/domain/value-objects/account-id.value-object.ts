import {
  DomainPrimitive,
  ValueObject,
} from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import {
  ArgumentNotProvidedException,
  ArgumentInvalidException,
} from '@libs/exceptions';

export class AccountId extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (Guard.isEmpty(value)) {
      throw new ArgumentNotProvidedException('Account id is not provided');
    }
    if (!AccountId.checkValue(value)) {
      throw new ArgumentInvalidException('Account id is invalid', value);
    }
  }

  static checkValue(value: string): boolean {
    if (!/(^\d{16}$)|(^\d{19}$)/.test(value)) {
      return false;
    }
    const numberStrings: string[] = String(value).split('');
    const numbers: number[] = [];
    numberStrings.forEach((numStr, index) => {
      if (index % 2 === 0) {
        let num: string | number = Number(numStr).toString(2).toString() + '0';
        num = parseInt(num, 2);
        num = ((num / 10) | 0) + (num % 10);
        numbers[index] = num;
      } else {
        numbers[index] = parseInt(numStr);
      }
    });
    return numbers.reduce((tol, num) => tol + num, 0) % 10 === 0;
  }
}
