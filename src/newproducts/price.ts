import { NotAcceptableException } from '@nestjs/common';

export class Price {
  private value: number | null;

  constructor(value: number | null) {
    if (value === null || this.signum(value) < 0) {
      throw new NotAcceptableException('Invalid price');
    }

    this.value = value;
  }

  public isNonZero(): boolean {
    return this.signum(this.value) !== 0;
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
}
