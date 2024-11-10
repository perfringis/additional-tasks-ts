import { CustomerDto } from './customer.dto';
import { Order, OrderState, OrderType } from './order.entity';

import objectHash from 'object-hash';

export class OrderDto {
  private orderId: string;
  private confirmationTimestamp: Date;
  private orderType: OrderType;
  private orderState: OrderState;
  private customerDto: CustomerDto;

  constructor(order: Order) {
    this.confirmationTimestamp = order.getConfirmationTimestamp();
    this.orderState = order.getOrderState();
    this.orderType = order.getOrderType();
    this.customerDto = new CustomerDto(
      order.getCustomerOrderGroup().getCustomer(),
    );
    this.orderId = order.getId();
  }

  public getConfirmationTimestamp(): Date {
    return this.confirmationTimestamp;
  }

  public setConfirmationTimestamp(confirmationTimestamp: Date): void {
    this.confirmationTimestamp = confirmationTimestamp;
  }

  public getOrderType(): OrderType {
    return this.orderType;
  }

  public setOrderType(orderType: OrderType): void {
    this.orderType = orderType;
  }

  public getOrderState(): OrderState {
    return this.orderState;
  }

  public setOrderState(orderState: OrderState): void {
    this.orderState = orderState;
  }

  public getCustomerDto(): CustomerDto {
    return this.customerDto;
  }

  public setCustomerDto(customerDto: CustomerDto): void {
    this.customerDto = customerDto;
  }

  public hashCode(): string {
    return objectHash({
      id: this.orderId,
    });
  }
}
