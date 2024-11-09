import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderLine } from './order.line.entity';
import { CustomerOrderGroup } from './customer.order.group.entity';
import { TaxRule } from './tax.rule.entity';

export enum OrderState {
  INITIAL = 'INITIAL',
  PAID = 'PAID',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
}

export enum OrderType {
  PHONE = 'PHONE',
  WIRE = 'WIRE',
  WIRE_ONE_ITEM = 'WIRE_ONE_ITEM',
  SPECIAL_DISCOUNT = 'SPECIAL_DISCOUNT',
  REGULAR_BATCH = 'REGULAR_BATCH',
}

@Entity({ name: 'order' })
export class Order {
  public getItems(): OrderLine[] {
    return this.items;
  }

  public setItems(items: OrderLine[]): void {
    this.items = items;
  }

  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ nullable: true, type: 'enum', enum: OrderState })
  private orderState: OrderState;

  @Column({ nullable: true, type: 'enum', enum: OrderType })
  private orderType: OrderType;

  @ManyToOne(
    () => CustomerOrderGroup,
    (customerOrderGroup) => customerOrderGroup.orders,
  )
  @JoinColumn({ name: 'customer_order_group_id' })
  private customerOrderGroup: CustomerOrderGroup;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  public items: OrderLine[];

  @ManyToMany(() => TaxRule)
  public taxRules: TaxRule[];

  @Column({ name: 'confirmation_timestamp', nullable: true, type: 'datetime' })
  private confirmationTimestamp: Date;

  public getId(): string {
    return this.id;
  }

  public getConfirmationTimestamp(): Date {
    return this.confirmationTimestamp;
  }

  public getOrderState(): OrderState {
    return this.orderState;
  }

  public setOrderState(orderState: OrderState): void {
    this.orderState = orderState;
  }

  public getOrderType(): OrderType {
    return this.orderType;
  }

  public setOrderType(orderType: OrderType): void {
    this.orderType = orderType;
  }

  public getCustomerOrderGroup(): CustomerOrderGroup {
    return this.customerOrderGroup;
  }

  public setCustomerOrderGroup(customerOrderGroup: CustomerOrderGroup): void {
    this.customerOrderGroup = customerOrderGroup;
  }

  public getTaxRules(): TaxRule[] {
    return this.taxRules;
  }

  public setTaxRules(taxRules: TaxRule[]): void {
    this.taxRules = taxRules;
  }
}
