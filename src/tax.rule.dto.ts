import { TaxRule } from './tax.rule.entity';

import objectHash from 'object-hash';

export class TaxRuleDto {
  public formattedTaxCode: string;
  private id: string;
  private isLinear: boolean;
  private aFactor: number;
  private bFactor: number;
  private isSquare: boolean;
  private aSquareFactor: number;
  private bSquareFactor: number;
  private cSquareFactor: number;

  constructor(taxRule: TaxRule) {
    this.formattedTaxCode = ' informal 671 ' + taxRule.getTaxCode() + ' *** ';
    this.isLinear = taxRule.getIsLinear();
    this.aFactor = taxRule.getAFactor();
    this.bFactor = taxRule.getBFactor();
    this.isSquare = taxRule.getIsSquare();
    this.aSquareFactor = taxRule.getASquareFactor();
    this.bSquareFactor = taxRule.getBSquareFactor();
    this.cSquareFactor = taxRule.getCSquareFactor();
  }

  public getIsLinear(): boolean {
    return this.isLinear;
  }

  public setIsLinear(isLinear: boolean): void {
    this.isLinear = isLinear;
  }

  public getAFactor(): number {
    return this.aFactor;
  }

  public setAFactor(aFactor: number): void {
    this.aFactor = aFactor;
  }

  public getBFactor(): number {
    return this.bFactor;
  }

  public setBFactor(bFactor: number): void {
    this.bFactor = bFactor;
  }

  public getIsSquare(): boolean {
    return this.isSquare;
  }

  public setIsSquare(isSquare: boolean): void {
    this.isSquare = isSquare;
  }

  public getASquareFactor(): number {
    return this.aSquareFactor;
  }

  public setASquareFactor(aSquareFactor: number): void {
    this.aSquareFactor = aSquareFactor;
  }

  public getBSquareFactor(): number {
    return this.bSquareFactor;
  }

  public setBSquareFactor(bSquareFactor: number): void {
    this.bSquareFactor = bSquareFactor;
  }

  public getCSquareFactor(): number {
    return this.cSquareFactor;
  }

  public setCSquareFactor(cSquareFactor: number): void {
    this.cSquareFactor = cSquareFactor;
  }

  public hashCode(): string {
    return objectHash({ id: this.id });
  }
}
