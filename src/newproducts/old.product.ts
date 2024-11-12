import { NotAcceptableException } from '@nestjs/common';
import { OldProductId } from './old.product.id';
import { Price } from './price';

export class OldProduct {
  private serialNumber: OldProductId;
  private price: Price;

  desc: string;
  longDesc: string;
  counter: number | null;

  constructor(
    price: number | null,
    desc: string,
    longDesc: string,
    counter: number | null,
  ) {
    this.price = new Price(price);
    this.desc = desc;
    this.longDesc = longDesc;
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
    if (
      this.longDesc === null ||
      this.longDesc.length === 0 ||
      this.desc === null ||
      this.desc.length === 0
    ) {
      throw new NotAcceptableException('null or empty desc');
    }
    this.longDesc = this.longDesc.replace(charToReplace, replaceWith);
    this.desc = this.desc.replace(charToReplace, replaceWith);
  }

  formatDesc(): string {
    if (
      this.longDesc == null ||
      this.longDesc.length === 0 ||
      this.desc == null ||
      this.desc.length === 0
    ) {
      return '';
    }
    return this.desc + ' *** ' + this.longDesc;
  }

  public getPrice(): Price {
    return this.price;
  }
}
