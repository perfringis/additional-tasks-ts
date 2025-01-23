import { PayerId } from './payer.id';
import { ClientAddress } from './client.address';

export interface ClientAddressRemoteService {
  getByPayerId(payerId: PayerId): ClientAddress;
}
