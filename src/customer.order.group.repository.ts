import { DataSource, Repository } from 'typeorm';
import { CustomerOrderGroup } from './customer.order.group.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerOrderGroupRepository extends Repository<CustomerOrderGroup> {
  constructor(private dataSource: DataSource) {
    super(CustomerOrderGroup, dataSource.createEntityManager());
  }
}
