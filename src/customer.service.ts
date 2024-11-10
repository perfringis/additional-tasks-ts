import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { Customer, CustomerType } from './customer.entity';
import { CustomerDto } from './customer.dto';
import { OrderDto } from './order.dto';
import { CustomerOrderGroup } from './customer.order.group.entity';
import { Order } from './order.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async getCustomerBy(id: string): Promise<CustomerDto> {
    const byId: Customer = await this.customerRepository.findById(id);

    if (byId === null) {
      throw new NotAcceptableException();
    }

    return new CustomerDto(byId);
  }

  public async getIndividualOrdersForCustomer(
    customerId: string,
  ): Promise<OrderDto[]> {
    const customerDto: CustomerDto = await this.getCustomerBy(customerId);
    const customer: Customer = await this.customerRepository.getOne(
      customerDto.getId(),
    );
    const group: CustomerOrderGroup = customer.getGroup();
    if (
      !(customer.getType() === CustomerType.REPRESENTATIVE) &&
      !(customer.getType() === CustomerType.PERSON)
    ) {
      throw new NotAcceptableException('not a person nor representative');
    }
    if (group === null) {
      throw new NotAcceptableException('group cannot be null');
    }

    const orders: Set<Order> = group.getOrders();
    return [...orders].map((order: Order) => new OrderDto(order));
  }
}
