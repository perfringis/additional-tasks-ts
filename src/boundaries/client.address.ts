export class ClientAddress {
  private readonly address1: string;
  private readonly address2: string;
  private readonly address3: string;
  private readonly address4: string;

  constructor(
    address1: string,
    address2: string,
    address3: string,
    address4: string,
  ) {
    this.address1 = address1;
    this.address2 = address2;
    this.address3 = address3;
    this.address4 = address4;
  }

  public isWithEurope(): boolean {
    return this.address4.includes('Europe');
  }
}
