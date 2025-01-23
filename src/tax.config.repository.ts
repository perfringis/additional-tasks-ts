import { DataSource, Repository } from 'typeorm';
import { TaxConfig } from './tax.config.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxConfigRepository extends Repository<TaxConfig> {
  constructor(private dataSource: DataSource) {
    super(TaxConfig, dataSource.createEntityManager());
  }

  public async getOne(configId: string): Promise<TaxConfig> {
    return await this.findOne({
      where: {
        id: configId,
      },
    });
  }

  public async findByCountryCode(countryCode: string): Promise<TaxConfig> {
    return await this.findOne({
      where: {
        countryCode: countryCode,
      },
    });
  }

  public async findAll(): Promise<TaxConfig[]> {
    return await this.find({});
  }
}
