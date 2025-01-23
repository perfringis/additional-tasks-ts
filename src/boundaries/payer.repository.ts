import { PayerId } from './payer.id';
import { Payer } from './payer';

export interface PayerRepository {
  findById(payerId: PayerId): Payer;
}
