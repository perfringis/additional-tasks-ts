import { PayerId } from './payer.id';

export interface ClaimsRemoteService {
  clientHasNoClaims(payerId: PayerId): boolean;
}
