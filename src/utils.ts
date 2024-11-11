import { TaxRule } from './tax.rule.entity';

export class Utils {
  static distinctByKey(
    func: (taxRule: TaxRule) => string,
  ): (taxRule: TaxRule, index: number, taxRules: TaxRule[]) => boolean {
    const seen = new Set();

    return (taxRule: TaxRule): boolean => {
      const key = func(taxRule);

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    };
  }
}
