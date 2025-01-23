import { PayerRepository } from './payer.repository';
import { ClientAddressRemoteService } from './client.address.remote.service';
import { OrderRemoteService } from './order.remote.service';
import { ClaimsRemoteService } from './claims.remote.service';
import { PayerId } from './payer.id';
import { Payer } from './payer';
import { ClientOrder } from './client.order';

export class PaymentService {
  private readonly MIN_AMOUNT_OF_ONE_ORDER_TO_BE_VIP: number = 100;
  private readonly MIN_AMOUNT_OF_ORDERS_TO_BE_VIP: number = 10;

  private readonly payerRepository: PayerRepository;
  private readonly ordersRemoteService: ClientAddressRemoteService;
  private readonly orderRemoteService: OrderRemoteService;
  private readonly claimsRemoteService: ClaimsRemoteService;

  constructor(
    payerRepository: PayerRepository,
    payerAddressRemoteService: ClientAddressRemoteService,
    orderRemoteService: OrderRemoteService,
    claimsRemoteService: ClaimsRemoteService,
  ) {
    this.payerRepository = payerRepository;
    this.ordersRemoteService = payerAddressRemoteService;
    this.orderRemoteService = orderRemoteService;
    this.claimsRemoteService = claimsRemoteService;
  }

  public pay(payerId: PayerId, amountToPay: number): boolean {
    const payer: Payer = this.payerRepository.findById(payerId);
    if (this.canAfford(amountToPay, payer)) {
      this._pay(amountToPay, payer);
      return true;
    } else if (this.payerIsVip(payer)) {
      this.payUsingExtraLimit(amountToPay, payer);
      return true;
    } else {
      return false;
    }
  }

  private _pay(amountToPay: number, payer: Payer): void {
    payer.pay(amountToPay);
    this.orderRemoteService.informAboutNewOrderWithPayment(amountToPay);
  }

  private payUsingExtraLimit(amountToPay: number, payer: Payer): void {
    payer.payUsingExtraLimit(amountToPay);
    this.orderRemoteService.informAboutNewOrderWithPayment(amountToPay);
  }

  private canAfford(amountToPay: number, payer: Payer): boolean {
    return payer.has(amountToPay);
  }

  private payerIsVip(payer: Payer): boolean {
    return (
      this.hasEnoughOrders(payer) &&
      this.addressIsInEurope(payer) &&
      this.isOldEnough(payer) &&
      this.noClaimsBy(payer)
    );
  }

  private noClaimsBy(payer: Payer): boolean {
    return this.claimsRemoteService.clientHasNoClaims(payer.getPayerId());
  }

  private isOldEnough(payer: Payer) {
    return payer.isAtLeast20yo();
  }

  private addressIsInEurope(payer: Payer): boolean {
    return this.ordersRemoteService
      .getByPayerId(payer.getPayerId())
      .isWithEurope();
  }

  private hasEnoughOrders(payer: Payer): boolean {
    const clientOrders: ClientOrder[] = this.orderRemoteService.getByPayerId(
      payer.getPayerId(),
    );

    return (
      clientOrders.filter((clientOrder: ClientOrder): boolean =>
        clientOrder.isMoreThan(this.MIN_AMOUNT_OF_ONE_ORDER_TO_BE_VIP),
      ).length > this.MIN_AMOUNT_OF_ORDERS_TO_BE_VIP
    );
  }
}
