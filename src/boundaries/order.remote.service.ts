import { PayerId } from './payer.id';
import { ClientOrder } from './client.order';

export interface OrderRemoteService {
  getByPayerId(payerId: PayerId): ClientOrder[];

  informAboutNewOrderWithPayment(amount: number): void;
}
