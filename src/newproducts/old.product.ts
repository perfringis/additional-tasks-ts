import { OldProductId } from './old.product.id';
import { Price } from './price';
import { Description } from './description';
import { Counter } from './counter';
import { NotAcceptableException } from '@nestjs/common';

export class OldProduct {
  private serialNumber: OldProductId;
  private price: Price;
  private desc: Description;
  private counter: Counter;

  constructor(
    price: number | null,
    desc: string,
    longDesc: string,
    counter: number | null,
  ) {
    this.price = new Price(price);
    this.desc = new Description(desc, longDesc);
    this.counter = new Counter(counter);
  }

  decrementCounter(): void {
    if (this.price.isNonZero()) {
      this.counter = this.counter.decrement();
    } else {
      throw new NotAcceptableException('Invalid price');
    }
  }

  incrementCounter(): void {
    if (this.price.isNonZero()) {
      this.counter = this.counter.increment();
    } else {
      throw new NotAcceptableException('Invalid price');
    }
  }

  changePriceTo(newPrice: number): void {
    if (this.counter.hasAny()) {
      this.price = new Price(newPrice);
    }
  }

  replaceCharFromDesc(charToReplace: string, replaceWith: string): void {
    this.desc = this.desc.replace(charToReplace, replaceWith);
  }

  formatDesc(): string {
    return this.desc.format();
  }

  public getPrice(): Price {
    return this.price;
  }

  public getDescription(): Description {
    return this.desc;
  }

  public getCounter(): Counter {
    return this.counter;
  }
}
