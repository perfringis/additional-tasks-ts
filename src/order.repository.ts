import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order, OrderState } from './order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  public async getOne(orderId: string): Promise<Order> {
    return await this.findOne({
      where: {
        id: orderId,
      },
    });
  }

  public async findByOrderState(orderState: OrderState): Promise<Order[]> {
    return await this.find({
      where: {
        orderState: orderState,
      },
    });
  }
}
