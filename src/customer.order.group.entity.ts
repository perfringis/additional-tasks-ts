import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Order } from './order.entity';

import objectHash from 'object-hash';

@Entity({ name: 'customer_order_group' })
export class CustomerOrderGroup {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @OneToMany(() => Order, (order) => order.customerOrderGroup)
  public orders: Set<Order>;

  @Column({ name: 'description', nullable: true, type: 'varchar', length: 255 })
  private description: string;

  @OneToOne(() => Customer, (customer) => customer.customerOrderGroup, {
    cascade: true,
  })
  @JoinColumn({ name: 'customer_id' })
  public customer: Customer;

  @ManyToOne(
    () => CustomerOrderGroup,
    (customerOrderGroup) => customerOrderGroup.children,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'parent_id' })
  public parent: CustomerOrderGroup;

  @OneToMany(
    () => CustomerOrderGroup,
    (customerOrderGroup) => customerOrderGroup.parent,
  )
  public children: Set<CustomerOrderGroup>;

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

  public getChildren(): Set<CustomerOrderGroup> {
    return this.children;
  }

  public setChildren(children: Set<CustomerOrderGroup>): void {
    this.children = children;
  }

  public hashCode(): string {
    return objectHash({ id: this.id });
  }

  public toString(): string {
    // prettier-ignore
    return "CustomerOrderGroup{" +
            "customer='" + this.customer.getName() + '\'' +
            ", parent=" + parent +
            '}';
  }
}
