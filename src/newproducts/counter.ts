import { NotAcceptableException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const CounterTransformer: ValueTransformer = {
  from: (counter: number) => new Counter(counter),
  to: (counter: Counter) => counter.getIntValue(),
};

export class Counter {
  private counter: number;

  constructor(counter: number) {
    if (counter < 0) {
      throw new NotAcceptableException(
        'Cannot have negative counter: ' + counter,
      );
    }

    this.counter = counter;
  }

  public getIntValue(): number {
    return this.counter;
  }

  public increment(): Counter {
    return new Counter(this.counter + 1);
  }

  public decrement(): Counter {
    return new Counter(this.counter - 1);
  }

  public hasAny(): boolean {
    return this.counter > 0;
  }
}
