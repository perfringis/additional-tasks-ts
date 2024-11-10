import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaxRule } from './tax.rule.entity';

import objectHash from 'object-hash';

@Entity({ name: 'tax_config' })
export class TaxConfig {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ name: 'description', nullable: true, type: 'varchar', length: 255 })
  private description: string;

  @Column({
    name: 'country_reason',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  private countryReason: string;

  @Column({
    name: 'country_code',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  private countryCode: string;

  @Column({ name: 'last_modified_date', nullable: true, type: 'datetime' })
  private lastModifiedDate: Date;

  @Column({ name: 'modified_by', nullable: true, type: 'varchar', length: 255 })
  private modifiedBy: string;

  @Column({ name: 'current_rules_count', nullable: true, type: 'int' })
  private currentRulesCount: number;

  @Column({ name: 'max_rules_count', nullable: true, type: 'int' })
  private maxRulesCount: number;

  @OneToMany(() => TaxRule, (taxRule) => taxRule.taxConfig)
  public taxRules: TaxRule[];

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getCountryReason(): string {
    return this.countryReason;
  }

  public setCountryReason(countryReason: string): void {
    this.countryReason = countryReason;
  }

  public getCountryCode(): string {
    return this.countryCode;
  }

  public setCountryCode(countryCode: string): void {
    this.countryCode = countryCode;
  }

  public getLastModifiedDate(): Date {
    return this.lastModifiedDate;
  }

  public getModifiedBy(): string {
    return this.modifiedBy;
  }

  public setModifiedBy(modifiedBy: string): void {
    this.modifiedBy = modifiedBy;
  }

  public getCurrentRulesCount(): number {
    return this.currentRulesCount;
  }

  public setCurrentRulesCount(currentRulesCount: number): void {
    this.currentRulesCount = currentRulesCount;
  }

  public getMaxRulesCount(): number {
    return this.maxRulesCount;
  }

  public setMaxRulesCount(maxRulesCount: number): void {
    this.maxRulesCount = maxRulesCount;
  }

  public getTaxRules(): TaxRule[] {
    return this.taxRules;
  }

  public setTaxRules(taxRules: TaxRule[]): void {
    this.taxRules = taxRules;
  }

  public hashCode(): string {
    return objectHash({ id: this.id });
  }
}
