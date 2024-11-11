import { Injectable, NotAcceptableException } from '@nestjs/common';
import { TaxRuleRepository } from './tax.rule.repository';
import { TaxConfigRepository } from './tax.config.repository';
import { OrderRepository } from './order.repository';
import { TaxRule } from './tax.rule.entity';

import dayjs from 'dayjs';
import { TaxConfig } from './tax.config.entity';
import { Order, OrderState } from './order.entity';
import { CustomerType } from './customer.entity';

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
    let taxConfig: TaxConfig =
      await this.taxConfigRepository.findByContryCode(countryCode);
    if (taxConfig === null) {
      taxConfig = await this.createTaxConfigWithRule(countryCode, taxRule);
    }

    const byOrderState: Order[] = await this.orderRepository.findByOrderState(
      OrderState.INITIAL,
    );

    byOrderState.forEach(async (order) => {
      if (
        order.getCustomerOrderGroup().getCustomer().getType() ===
        CustomerType.PERSON
      ) {
        order.getTaxRules().push(taxRule);
        await this.orderRepository.save(order);
      }
    });
  }

  public async createTaxConfigWithRule(
    countryCode: string,
    taxRule: TaxRule,
  ): Promise<TaxConfig> {
    const taxConfig: TaxConfig = new TaxConfig();
    taxConfig.setCountryCode(countryCode);
    taxConfig.getTaxRules().push(taxRule);
    taxConfig.setCurrentRulesCount(taxConfig.getTaxRules().length);
    if (
      countryCode === null ||
      countryCode === '' ||
      countryCode.length === 1
    ) {
      throw new NotAcceptableException('Invalid country code');
    }

    return await this.taxConfigRepository.save(taxConfig);
  }

  public async _addTaxRuleToCountry(
    countryCode: string,
    aFactor: number,
    bFactor: number,
    cFactor: number,
    taxCode: string,
  ): Promise<void> {
    if (aFactor === 0) {
      throw new NotAcceptableException('Invalid aFactor');
    }

    if (countryCode == null || countryCode === '' || countryCode.length == 1) {
      throw new NotAcceptableException('Invalid country code');
    }

    const taxRule: TaxRule = new TaxRule();
    taxRule.setASquareFactor(aFactor);
    taxRule.setBSquareFactor(bFactor);
    taxRule.setCSquareFactor(cFactor);
    taxRule.setIsSquare(true);
    const year: number = dayjs().year();
    taxRule.setTaxCode('A. 899. ' + year + taxCode);

    const taxConfig: TaxConfig =
      await this.taxConfigRepository.findByContryCode(countryCode);
    if (taxConfig === null) {
      await this.createTaxConfigWithRule(countryCode, taxRule);
    }
  }

  public async deleteRule(taxRuleId: string): Promise<void> {
    const taxRule: TaxRule = await this.taxRuleRepository.getOne(taxRuleId);
    const config: TaxConfig = taxRule.getTaxConfig();
    if (config.getTaxRules().length === 1) {
      throw new NotAcceptableException('Last rule in country config');
    }

    await this.taxRuleRepository.remove(taxRule);
  }

  public async findAllConfigs(): Promise<TaxConfig[]> {
    return await this.taxConfigRepository.findAll();
  }
}
