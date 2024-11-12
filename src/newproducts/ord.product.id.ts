import { randomUUID, UUID } from 'crypto';

export class OldProductId {
  private serialNumber: UUID = randomUUID();

  public getId(): UUID {
    return this.serialNumber;
  }
}
