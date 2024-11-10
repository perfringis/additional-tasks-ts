import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Order } from './order.entity';

@Entity({ name: 'customer_order_group' })
export class CustomerOrderGroup {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @OneToMany(() => Order, (order) => order.customerOrderGroup, {
    eager: true,
  })
  public orders: Set<Order>;

  @OneToOne(() => Customer, (customer) => customer.customerOrderGroup, {
    eager: true,
  })
  @JoinColumn({ name: 'customer_id' })
  public customer: Customer;

  private parent: CustomerOrderGroup;

  private childs: Set<CustomerOrderGroup>;
  order: any;

  public getCustomerName(): string {
    return this.customer.getName();
  }

  public getParent(): CustomerOrderGroup {
    return this.parent;
  }

  public getOrders(): Set<Order> {
    return this.orders;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getChilds(): Set<CustomerOrderGroup> {
    return this.childs;
  }

  public setChilds(childs: Set<CustomerOrderGroup>): void {
    this.childs = childs;
  }
}
