import { NotAcceptableException } from '@nestjs/common';
import { Price, PriceTransformer } from './price';
import { Counter, CounterTransformer } from './counter';
import { Description } from './description';
import { randomUUID, UUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'old_product' })
export class OldProduct {
  @PrimaryColumn({ name: 'serial_number' })
  serialNumber: UUID = randomUUID();

  @Column({ name: 'price', type: 'int', transformer: PriceTransformer })
  private price: Price;

  @Column(() => Description, { prefix: true })
  private desc: Description;

  @Column({ name: 'counter', type: 'int', transformer: CounterTransformer })
  private counter: Counter;

  constructor(price: number, desc: string, longDesc: string, counter: number) {
    this.price = Price.of(price);
    this.desc = new Description(desc, longDesc);
    this.counter = new Counter(counter);
  }

  public decrementCounter(): void {
    if (this.price.isNonZero()) {
      this.counter = this.counter.decrement();
    } else {
      throw new NotAcceptableException('price is zero');
    }
  }

  public incrementCounter(): void {
    if (this.price.isNonZero()) {
      this.counter = this.counter.increment();
    } else {
      throw new NotAcceptableException('price is zero');
    }
  }

  public changePriceTo(price: number): void {
    if (this.counter.hasAny()) {
      this.price = Price.of(price);
    }
  }

  public replaceCharFromDesc(charToReplace: string, replaceWith: string): void {
    this.desc = this.desc.replace(charToReplace, replaceWith);
  }

  public formatDesc(): string {
    return this.desc.formatted();
  }

  public getPrice(): number {
    return this.price.getAsNumber();
  }

  public getCounter(): number {
    return this.counter.getIntValue();
  }

  public getSerialNumber(): UUID {
    return this.serialNumber;
  }
}
