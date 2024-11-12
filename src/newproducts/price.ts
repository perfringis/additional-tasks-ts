export class Price {
  private value: number | null;

  constructor(value: number | null) {
    this.value = value;
  }

  public isNotNull(): boolean {
    return this.value !== null;
  }

  public isPositive(): boolean {
    return this.value > 0;
  }

  public isPositiveAndNotNull(): boolean {
    return this.isPositive() && this.isNotNull();
  }
}
