import { OldProductRepository } from './old.product.repository';
import { OldProduct } from './old.product';
import { OldProductDescription } from './old.product.description';
import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OldProductDescriptionRepository {
  private readonly oldProductRepository: OldProductRepository;

  constructor(oldProductRepository: OldProductRepository) {
    this.oldProductRepository = oldProductRepository;
  }

  public async findAll(): Promise<OldProductDescription[]> {
    const oldProducts: OldProduct[] = await this.oldProductRepository.findAll();

    return await Promise.all(
      oldProducts.map(
        async (oldProduct: OldProduct): Promise<OldProductDescription> =>
          new OldProductDescription(oldProduct),
      ),
    );
  }

  public async getOne(productId: UUID): Promise<OldProductDescription> {
    return new OldProductDescription(
      await this.oldProductRepository.getOne(productId),
    );
  }
}
