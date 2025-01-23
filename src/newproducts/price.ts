import { NotAcceptableException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const PriceTransformer: ValueTransformer = {
  from: (price: number) => Price.of(price),
  to: (price: Price) => price.getAsNumber(),
};

export class Price {
  private price: number | null;

  static of(price: number) {
    return new Price(price);
  }

  private constructor(price: number | null) {
    if (price === null || this.signum(price) < 0) {
      throw new NotAcceptableException('Invalid price');
    }

    this.price = price;
  }

  public isNonZero(): boolean {
    return this.signum(this.price) !== 0;
  }

  private signum(value: number): number {
    if (value > 0) {
      return 1;
    } else if (value < 0) {
      return -1;
    } else if (value === 0) {
      return 0;
    }
  }

  public getAsNumber(): number {
    return this.price;
  }
}
