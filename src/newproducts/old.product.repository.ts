import { DataSource, Repository } from 'typeorm';
import { OldProduct } from './old.product';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class OldProductRepository extends Repository<OldProduct> {
  constructor(private dataSource: DataSource) {
    super(OldProduct, dataSource.createEntityManager());
  }

  public async findAll(): Promise<OldProduct[]> {
    return await this.find({});
  }

  public async getOne(productId: UUID): Promise<OldProduct> {
    return await this.findOne({
      where: {
        serialNumber: productId,
      },
    });
  }
}
