import { Controller, Get } from '@nestjs/common';
import { TaxRuleService } from './tax.rule.service';
import { TaxRule } from './tax.rule.entity';
import { TaxConfig } from './tax.config.entity';
import { Utils } from './utils';

@Controller()
export class TaxConfigController {
  constructor(private readonly taxRuleService: TaxRuleService) {}

  @Get('/config')
  public async taxConfigs(): Promise<Map<string, TaxRule[]>> {
    const taxConfigs: TaxConfig[] = await this.taxRuleService.findAllConfigs();

    const map: Map<string, TaxRule[]> = new Map<string, TaxRule[]>();
    for (const tax of taxConfigs) {
      if (map.get(tax.getCountryCode()) === null) {
        if (tax.getTaxRules() === null) {
          tax.setTaxRules([]);
        }
        map.set(tax.getCountryCode(), tax.getTaxRules());
      } else {
        map.get(tax.getCountryCode()).push(...tax.getTaxRules());
      }
    }

    const newRuleMap: Map<string, TaxRule[]> = new Map<string, TaxRule[]>();

    newRuleMap.forEach((value: TaxRule[], key: string) => {
      const newList: TaxRule[] = value.filter(
        Utils.distinctByKey((rule: TaxRule) => rule.getTaxCode()),
      );

      newRuleMap.set(key, newList);
    });

    return newRuleMap;
  }
}
