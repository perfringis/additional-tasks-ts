export class ClientOrder {
  private readonly amount: number;
  private readonly timestamp: Date;

  constructor(amount: number, timestamp: Date) {
    this.amount = amount;
    this.timestamp = timestamp;
  }

  public isMoreThan(amount: number): boolean {
    return this.amount > amount;
  }
}
