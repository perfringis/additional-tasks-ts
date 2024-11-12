import { NotAcceptableException } from '@nestjs/common';

export class Price {
  private value: number | null;

  constructor(value: number | null) {
    if (value === null || value <= 0) {
      throw new NotAcceptableException('Invalid price');
    }

    this.value = value;
  }

  public isNonZero(): boolean {
    return this.value !== null && this.value > 0;
  }
}
