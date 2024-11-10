import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';

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
}
