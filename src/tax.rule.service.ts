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
    if (!countryCode || countryCode.length === 1) {
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
      await this.taxConfigRepository.findByCountryCode(countryCode);
    if (!taxConfig) {
      taxConfig = await this.createTaxConfigWithRule(countryCode, taxRule);
      return;
    }

    if (taxConfig.getMaxRulesCount() <= taxConfig.getCurrentRulesCount() + 1) {
      throw new NotAcceptableException('Too many rules');
    }

    taxConfig.getTaxRules().push(taxRule);
    taxConfig.setCurrentRulesCount(taxConfig.getCurrentRulesCount() + 1);
    taxConfig.setLastModifiedDate(new Date());

    const byOrderState: Order[] = await this.orderRepository.findByOrderState(
      OrderState.INITIAL,
    );

    await Promise.all(
      byOrderState.map(async (order: Order): Promise<void> => {
        if (
          order.getCustomerOrderGroup().getCustomer().getType() ===
          CustomerType.PERSON
        ) {
          order.getTaxRules().push(taxRule);
          await this.orderRepository.save(order);
        }
      }),
    );
  }

  public async createTaxConfigWithRule(
    countryCode: string,
    taxRule: TaxRule,
  ): Promise<TaxConfig> {
    const taxConfig: TaxConfig = new TaxConfig();
    taxConfig.setCountryCode(countryCode);
    taxConfig.getTaxRules().push(taxRule);
    taxConfig.setCurrentRulesCount(taxConfig.getTaxRules().length);
    taxConfig.setLastModifiedDate(new Date());

    if (!countryCode || countryCode.length === 1) {
      throw new NotAcceptableException('Invalid country code');
    }

    return await this.taxConfigRepository.save(taxConfig);
  }

  public async _createTaxConfigWithRule(
    countryCode: string,
    maxRulesCount: number,
    taxRule: TaxRule,
  ): Promise<TaxConfig> {
    const taxConfig: TaxConfig = new TaxConfig();
    taxConfig.setCountryCode(countryCode);
    taxConfig.getTaxRules().push(taxRule);
    taxConfig.setCurrentRulesCount(taxConfig.getTaxRules().length);
    taxConfig.setMaxRulesCount(maxRulesCount);
    taxConfig.setLastModifiedDate(new Date());
    if (!countryCode) {
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

    if (!countryCode || countryCode.length === 1) {
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
      await this.taxConfigRepository.findByCountryCode(countryCode);
    if (!taxConfig) {
      await this.createTaxConfigWithRule(countryCode, taxRule);
    }

    taxConfig.getTaxRules().push(taxRule);
    taxConfig.setCurrentRulesCount(taxConfig.getCurrentRulesCount() + 1);
    taxConfig.setLastModifiedDate(new Date());
  }

  public async deleteRule(taxRuleId: string, configId: string): Promise<void> {
    const taxRule: TaxRule = await this.taxRuleRepository.getOne(taxRuleId);
    const taxConfig: TaxConfig =
      await this.taxConfigRepository.getOne(configId);

    if (this.includes(taxConfig.getTaxRules(), taxRule)) {
      if (taxConfig.getTaxRules().length === 1) {
        throw new NotAcceptableException('Last rule in country config');
      }
      await this.taxRuleRepository.remove(taxRule);
      taxConfig.getTaxRules().push(taxRule); // change to getTaxRules().delete(taxRule)
      taxConfig.setLastModifiedDate(new Date());
      taxConfig.setCurrentRulesCount(taxConfig.getCurrentRulesCount() - 1);
    }
  }

  public async findRules(countryCode: string): Promise<TaxRule[]> {
    const taxConfig: TaxConfig =
      await this.taxConfigRepository.findByCountryCode(countryCode);

    return taxConfig.getTaxRules();
  }

  public async rulesCount(countryCode: string): Promise<number> {
    const taxConfig: TaxConfig =
      await this.taxConfigRepository.findByCountryCode(countryCode);

    return taxConfig.getCurrentRulesCount();
  }

  public async findAllConfigs(): Promise<TaxConfig[]> {
    return await this.taxConfigRepository.findAll();
  }

  private includes(taxRules: TaxRule[], taxRule: TaxRule): boolean {
    return taxRules
      .map((taxRule: TaxRule) => taxRule.getId())
      .includes(taxRule.getId());
  }
}
