import { Customer } from './customer.entity';

import objectHash from 'object-hash';

export class CustomerDto {
  private name: string;
  private id: string;

  constructor(customer: Customer) {
    this.name = customer.getName();
    this.id = customer.getId();
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getId(): string {
    return this.id;
  }

  public hashCode(): string {
    return objectHash({
      id: this.id,
      name: this.name,
    });
  }
}
