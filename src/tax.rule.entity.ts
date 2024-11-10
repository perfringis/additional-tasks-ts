import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaxConfig } from './tax.config.entity';

import objectHash from 'object-hash';

@Entity({ name: 'tax_rule' })
export class TaxRule {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({
    name: 'tax_code',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  private taxCode: string;

  @Column({ name: 'is_linear', nullable: true, type: 'boolean' })
  private isLinear: boolean;

  @Column({ name: 'a_factor', nullable: true, type: 'int' })
  private aFactor: number;

  @Column({ name: 'b_factor', nullable: true, type: 'int' })
  private bFactor: number;

  @Column({ name: 'is_square', nullable: true, type: 'boolean' })
  private isSquare: boolean;

  @Column({ name: 'a_square_factor', nullable: true, type: 'int' })
  private aSquareFactor: number;

  @Column({ name: 'b_square_factor', nullable: true, type: 'int' })
  private bSquareFactor: number;

  @Column({ name: 'c_square_factor', nullable: true, type: 'int' })
  private cSquareFactor: number;

  @ManyToOne(() => TaxConfig, (taxConfig) => taxConfig.taxRules, {
    eager: true,
  })
  @JoinColumn({ name: 'tax_config_id' })
  public taxConfig: TaxConfig;

  public getTaxConfig(): TaxConfig {
    return this.taxConfig;
  }

  public setTaxConfig(taxConfig: TaxConfig): void {
    this.taxConfig = taxConfig;
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

  public setTaxCode(taxCode: string): void {
    this.taxCode = taxCode;
  }

  public hashCode(): string {
    return objectHash({ id: this.id });
  }

  public getTaxCode(): string {
    return this.taxCode;
  }
}
