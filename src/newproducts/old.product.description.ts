import { OldProduct } from './old.product';

export class OldProductDescription {
  private oldProduct: OldProduct;

  constructor(oldProduct: OldProduct) {
    this.oldProduct = oldProduct;
  }

  public replaceCharFromDesc(charToReplace: string, replaceWith: string): void {
    this.oldProduct.replaceCharFromDesc(charToReplace, replaceWith);
  }

  public formatDesc(): string {
    return this.oldProduct.formatDesc();
  }
}
