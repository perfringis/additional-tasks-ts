import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { OrderRepository } from './order.repository';
import { CustomerOrderGroupRepository } from './customer.order.group.repository';
import { AuthenticationContextFacade } from './AuthenticationContextFacade';
import { OrderDto } from './order.dto';
import { CustomerDto } from './customer.dto';
import { Customer, CustomerType } from './customer.entity';
import { CustomerOrderGroup } from './customer.order.group.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
    private readonly customerOrderGroupRepository: CustomerOrderGroupRepository,
    private readonly authenticationContextFacade: AuthenticationContextFacade,
  ) {}

  public async getOrdersForCompany(customerId: string): Promise<OrderDto[]> {
    const customerDto: CustomerDto =
      await this.customerService.getCustomerBy(customerId);
    const customer: Customer = await this.customerRepository.getOne(
      customerDto.getId(),
    );

    if (
      !(customer.getType() === CustomerType.COMPANY) &&
      !(customer.getType() === CustomerType.DIVISION)
    ) {
      throw new NotAcceptableException('not a person nor representative');
    }

    return await this.getOrdersIncludingSubordinates(customerId);
  }

  public async getOrdersForAdmin(customerId: string): Promise<OrderDto[]> {
    const customerDto: CustomerDto =
      await this.customerService.getCustomerBy(customerId);
    const customer: Customer = await this.customerRepository.getOne(
      customerDto.getId(),
    );

    if (!(customer.getType() === CustomerType.ADMIN)) {
      throw new NotAcceptableException('not an admin');
    }

    return await this.getOrdersIncludingSubordinates(customerId);
  }

  public async getOrdersIncludingSubordinates(
    customerId: string,
  ): Promise<OrderDto[]> {
    const customerDto: CustomerDto =
      await this.customerService.getCustomerBy(customerId);
    const customer: Customer = await this.customerRepository.getOne(
      customerDto.getId(),
    );

    const group: CustomerOrderGroup = customer.getGroup();
    if (group === null) {
      throw new NotAcceptableException('group cannot be null');
    }

    const orders: Set<OrderDto> = new Set<OrderDto>();
    for (const order of group.getOrders()) {
      orders.add(new OrderDto(order));
    }

    const children: Set<CustomerOrderGroup> = group.getChildren();
    if (children !== null) {
      for (const child of children) {
        const ordersWithSubordinates: OrderDto[] =
          await this.getOrdersIncludingSubordinates(
            child.getCustomer().getId(),
          );

        for (const order of ordersWithSubordinates) {
          orders.add(order);
        }
      }
    }

    return [...orders];
  }

  public async fetchChildOrders(
    group: CustomerOrderGroup,
    orders: Set<OrderDto>,
  ): Promise<OrderDto[]> {
    if (group === null) {
      throw new NotAcceptableException('group cannot be null');
    }

    for (const order of group.getOrders()) {
      orders.add(new OrderDto(order));
    }

    const children: Set<CustomerOrderGroup> = group.getChildren();
    if (children !== null) {
      for (const child of children) {
        const childOrders: OrderDto[] = await this.fetchChildOrders(
          child.getCustomer().getCustomerOrderGroup(),
          orders,
        );

        for (const order of childOrders) {
          orders.add(order);
        }
      }
    }

    return [...orders];
  }

  public async getOrderById(orderId: string): Promise<OrderDto> {
    const authentication: string = await this.authenticationContextFacade
      .getAuthentication()
      .getName();
    const c: Customer =
      await this.customerRepository.findByName(authentication);
    const getOrdersIncludingSubordinates: OrderDto[] =
      await this.getOrdersIncludingSubordinates(c.getId());

    const requested: OrderDto = new OrderDto(
      await this.orderRepository.getOne(orderId),
    );

    if (getOrdersIncludingSubordinates.includes(requested)) {
      return requested;
    }

    return null;
  }

  public async getLoggedCustomerOrders(
    includingSubordinates: boolean,
  ): Promise<OrderDto[]> {
    const authentication: string = await this.authenticationContextFacade
      .getAuthentication()
      .getName();
    const c: Customer =
      await this.customerRepository.findByName(authentication);
    if (includingSubordinates) {
      if (
        !(c.getType() === CustomerType.COMPANY) &&
        !(c.getType() === CustomerType.DIVISION)
      ) {
        throw new NotAcceptableException('not a company nor division');
        return await this.getOrdersIncludingSubordinates(c.getId());
      }
    } else {
      return await this.customerService.getIndividualOrdersForCustomer(
        c.getId(),
      );
    }
  }
}
