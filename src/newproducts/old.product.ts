import { NotAcceptableException } from '@nestjs/common';
import { OldProductId } from './old.product.id';
import { Price } from './price';
import { Description } from './description';

export class OldProduct {
  private serialNumber: OldProductId;
  private price: Price;

  desc: Description;
  counter: number | null;

  constructor(
    price: number | null,
    desc: string,
    longDesc: string,
    counter: number | null,
  ) {
    this.price = new Price(price);
    this.desc = new Description(desc, longDesc);
    this.counter = counter;
  }

  decrementCounter(): void {
    if (this.price.isNonZero()) {
      if (this.counter === null) {
        throw new NotAcceptableException('null counter');
      }
      this.counter = this.counter - 1;
      if (this.counter < 0) {
        throw new NotAcceptableException('Negative counter');
      }
    }
  }

  incrementCounter(): void {
    if (this.price.isNonZero()) {
      if (this.counter === null) {
        throw new NotAcceptableException('null counter');
      }
      if (this.counter + 1 < 0) {
        throw new NotAcceptableException('Negative counter');
      }
      this.counter = this.counter + 1;
    }
  }

  changePriceTo(newPrice: Price): void {
    if (this.counter === null) {
      throw new NotAcceptableException('null counter');
    }
    if (this.counter > 0) {
      if (newPrice === null) {
        throw new NotAcceptableException('new price null');
      }
      this.price = newPrice;
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
}
