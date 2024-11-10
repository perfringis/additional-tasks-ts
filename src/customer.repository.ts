import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  public async findById(id: string): Promise<Customer> {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }

  public async getOne(customerId: string): Promise<Customer> {
    return await this.findOne({
      where: {
        id: customerId,
      },
    });
  }

  public async findByName(authentication: string): Promise<Customer> {
    return await this.findOne({
      where: {
        name: authentication,
      },
    });
  }
}
