import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerOrderGroup } from './customer.order.group.entity';

import objectHash from 'object-hash';

export enum CustomerType {
  PERSON = 'PERSON',
  REPRESENTATIVE = 'REPRESENTATIVE',
  DIVISION = 'DIVISION',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
}

@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    name: 'name',
    nullable: true,
    type: 'varchar',
    length: 255,
    unique: true,
  })
  public name: string;

  @Column({ nullable: true, type: 'enum', enum: CustomerType })
  private type: CustomerType;

  @OneToOne(
    () => CustomerOrderGroup,
    (customerOrderGroup) => customerOrderGroup.customer,
  )
  public customerOrderGroup: CustomerOrderGroup;

  public getGroup(): CustomerOrderGroup {
    return this.customerOrderGroup;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getType(): CustomerType {
    return this.type;
  }

  public setType(type: CustomerType): void {
    this.type = type;
  }

  public getCustomerOrderGroup(): CustomerOrderGroup {
    return this.customerOrderGroup;
  }

  public setCustomerOrderGroup(customerOrderGroup: CustomerOrderGroup): void {
    this.customerOrderGroup = customerOrderGroup;
  }

  public hashCode(): string {
    return objectHash({ id: this.id });
  }

  public toString(): string {
    // prettier-ignore
    return "Customer{" +
           "name='" + this.name + '\'' +
           ", type=" + this.type +
           '}';
  }
}
