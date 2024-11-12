import { randomUUID, UUID } from 'crypto';

export class OldProductId {
  private value: UUID = randomUUID();

  getId(): UUID {
    return this.value;
  }
}
