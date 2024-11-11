import { NotAcceptableException } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';

export class OldProduct {
  serialNumber: UUID = randomUUID();
  // Create separate object for holding money
  price: number;
  desc: string;
  longDesc: string;
  // warehouse stock has to be separate too
  counter: number | null;

  // Probably, this method will be moved to warehouse stock class
  decrementCounter(): void {
    // price should be validated in separate money class
    if (this.price !== null && this.price > 0) {
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
    } else {
      // throw the error when price is negative
      throw new NotAcceptableException('Invalid price');
    }
  }

  constructor(
    price: number,
    desc: string,
    longDesc: string,
    counter: number | null,
  ) {
    this.price = price;
    this.desc = desc;
    this.longDesc = longDesc;
    this.counter = counter;
  }

  // Probably, this method will be moved to warehouse stock class
  incrementCounter(): void {
    // this logic should be in money class
    // if price negative or null then throwing the error
    if (this.price !== null && this.price > 0) {
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
    } else {
      // price can't be negative
      throw new NotAcceptableException('Invalid price');
    }
  }

  // Probably, this method will be moved to money class
  changePriceTo(newPrice: number): void {
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
      // update price
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
}
