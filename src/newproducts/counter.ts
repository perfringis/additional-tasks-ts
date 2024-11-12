import { NotAcceptableException } from '@nestjs/common';

export class Counter {
  private value: number;

  constructor(value: number | null) {
    if (value === null || value < 0) {
      throw new NotAcceptableException('null counter or negative counter');
    }
    this.value = value;
  }

  public decrement(): Counter {
    return new Counter(this.value - 1);
  }

  public increment(): Counter {
    return new Counter(this.value + 1);
  }

  asInt(): number {
    return this.value;
  }

  public hasAny(): boolean {
    return this.value > 0;
  }
}
