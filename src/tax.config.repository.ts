import { DataSource, Repository } from 'typeorm';
import { TaxConfig } from './tax.config.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxConfigRepository extends Repository<TaxConfig> {
  constructor(private dataSource: DataSource) {
    super(TaxConfig, dataSource.createEntityManager());
  }
}
