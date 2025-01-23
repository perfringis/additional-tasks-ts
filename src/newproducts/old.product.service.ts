import { OldProductRepository } from './old.product.repository';
import { OldProductDescriptionRepository } from './old.product.description.repository';
import { OldProductDescription } from './old.product.description';
import { OldProduct } from './old.product';
import { UUID } from 'crypto';

export class OldProductService {
  constructor(
    private readonly oldProductRepository: OldProductRepository,
    private readonly oldProductDescriptionRepository: OldProductDescriptionRepository,
  ) {}

  public async findAllDescriptions(): Promise<string[]> {
    const oldProductDescriptions: OldProductDescription[] =
      await this.oldProductDescriptionRepository.findAll();

    return await Promise.all(
      oldProductDescriptions.map(
        async (oldProductDescription: OldProductDescription) => {
          return oldProductDescription.formatDesc();
        },
      ),
    );
  }

  public async replaceCharInDesc(
    productId: UUID,
    oldChar: string,
    newChar: string,
  ): Promise<void> {
    const product: OldProductDescription =
      await this.oldProductDescriptionRepository.getOne(productId);

    product.replaceCharFromDesc(oldChar, newChar);
  }

  public async incrementCounter(productId: UUID): Promise<void> {
    const product: OldProduct =
      await this.oldProductRepository.getOne(productId);

    product.incrementCounter();
  }

  public async decrementCounter(productId: UUID): Promise<void> {
    const product: OldProduct =
      await this.oldProductRepository.getOne(productId);

    product.decrementCounter();
  }

  public async changePriceOf(productId: UUID, newPrice: number): Promise<void> {
    const product: OldProduct =
      await this.oldProductRepository.getOne(productId);

    product.changePriceTo(newPrice);
  }

  public async getCounterOf(serialNumber: UUID): Promise<number> {
    const product: OldProduct =
      await this.oldProductRepository.getOne(serialNumber);

    return product.getCounter();
  }

  public async getPriceOf(serialNumber: UUID): Promise<number> {
    const product: OldProduct =
      await this.oldProductRepository.getOne(serialNumber);

    return product.getPrice();
  }
}
