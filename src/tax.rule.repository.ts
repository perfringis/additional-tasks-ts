import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaxRule } from './tax.rule.entity';

@Injectable()
export class TaxRuleRepository extends Repository<TaxRule> {
  constructor(private dataSource: DataSource) {
    super(TaxRule, dataSource.createEntityManager());
  }

  public async getOne(taxRuleId: string): Promise<TaxRule> {
    return this.findOne({
      where: {
        id: taxRuleId,
      },
    });
  }
}
