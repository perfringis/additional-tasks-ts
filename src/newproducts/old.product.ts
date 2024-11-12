import { NotAcceptableException } from '@nestjs/common';
import { OldProductId } from './old.product.id';
import { Price } from './price';

export class OldProduct {
  private serialNumber: OldProductId;
  private price: Price;

  desc: string;
  longDesc: string;
  // warehouse stock has to be separate too
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

  // Probably, this method will be moved to warehouse stock class
  decrementCounter(): void {
    if (this.price.isNonZero()) {
      // counter should be validated in separate class
      // taking item from warehouse
      if (this.counter === null) {
        throw new NotAcceptableException('null counter');
      }
      this.counter = this.counter - 1;
      // throw the error when warehouse has negative amount of items
      if (this.counter < 0) {
        throw new NotAcceptableException('Negative counter');
      }
    }
  }

  // Probably, this method will be moved to warehouse stock class
  incrementCounter(): void {
    if (this.price.isNonZero()) {
      // when empty stock then throw an error
      if (this.counter === null) {
        throw new NotAcceptableException('null counter');
      }
      // add item to stock
      if (this.counter + 1 < 0) {
        throw new NotAcceptableException('Negative counter');
      }
      // and item to warehouse stock
      this.counter = this.counter + 1;
    }
  }

  // Probably, this method will be moved to money class
  changePriceTo(newPrice: Price): void {
    // if warehouse stock doesn't have any items throw the error
    if (this.counter === null) {
      throw new NotAcceptableException('null counter');
    }
    // when warehouse has some items
    if (this.counter > 0) {
      // price should be validated in separate class
      if (newPrice === null) {
        throw new NotAcceptableException('new price null');
      }
      this.price = newPrice;
    }
  }

  // i think it should be Description class
  replaceCharFromDesc(charToReplace: string, replaceWith: string): void {
    // if statement is repeating
    if (
      this.longDesc === null ||
      this.longDesc.length === 0 ||
      this.desc === null ||
      this.desc.length === 0
    ) {
      // when description or long description is not provided
      throw new NotAcceptableException('null or empty desc');
    }
    // replace text
    this.longDesc = this.longDesc.replace(charToReplace, replaceWith);
    this.desc = this.desc.replace(charToReplace, replaceWith);
  }

  // i think it should be Description class
  formatDesc(): string {
    // if statement is repeating
    if (
      this.longDesc == null ||
      this.longDesc.length === 0 ||
      this.desc == null ||
      this.desc.length === 0
    ) {
      // when description and long description are empty return nothing
      return '';
    }
    // return formatted description
    return this.desc + ' *** ' + this.longDesc;
  }

  public getPrice(): Price {
    return this.price;
  }
}
