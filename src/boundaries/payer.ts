import { PayerId } from './payer.id';

export class Payer {
  private readonly payerId: PayerId;
  private age: number;
  private availableLimit: number;
  private extraLimit: number;

  constructor(payerId: PayerId, age: number, availableLimit: number) {
    this.payerId = payerId;
    this.age = age;
    this.availableLimit = availableLimit;
  }

  public isAtLeast20yo(): boolean {
    return this.age >= 20;
  }

  public getPayerId(): PayerId {
    return this.payerId;
  }

  public has(amountToPay: number): boolean {
    return this.availableLimit >= amountToPay;
  }

  public pay(amountToPay: number): void {
    this.availableLimit = this.availableLimit - amountToPay;
  }

  public payUsingExtraLimit(amountToPay: number): void {
    this.extraLimit = this.extraLimit - amountToPay;
  }
}
