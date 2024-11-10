import { Injectable, NotAcceptableException } from '@nestjs/common';
import { TaxRuleRepository } from './tax.rule.repository';
import { TaxConfigRepository } from './tax.config.repository';
import { OrderRepository } from './order.repository';
import { TaxRule } from './tax.rule.entity';

import dayjs from 'dayjs';
import { TaxConfig } from './tax.config.entity';

@Injectable()
export class TaxRuleService {
  constructor(
    private readonly taxRuleRepository: TaxRuleRepository,
    private readonly taxConfigRepository: TaxConfigRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  public async addTaxRuleToCountry(
    countryCode: string,
    aFactor: number,
    bFactor: number,
    taxCode: string,
  ): Promise<void> {
    if (countryCode == null || countryCode === '' || countryCode.length === 1) {
      throw new NotAcceptableException('Invalid country code');
    }
    if (aFactor === 0) {
      throw new NotAcceptableException('Invalid aFactor');
    }
    const taxRule: TaxRule = new TaxRule();
    taxRule.setAFactor(aFactor);
    taxRule.setBFactor(bFactor);
    taxRule.setIsLinear(true);
    const year: number = dayjs().year();
    taxRule.setTaxCode('A. 899. ' + year + taxCode);
    const taxConfig: TaxConfig =
      await this.taxConfigRepository.findByContryCode(countryCode);

    // todo finish it
  }
}
