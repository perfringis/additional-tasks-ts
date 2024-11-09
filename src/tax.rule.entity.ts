import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaxConfig } from './tax.config.entity';

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

  @Column({ name: 'a_factor', nullable: true, type: 'boolean' })
  private aFactor: boolean;

  @Column({ name: 'b_factor', nullable: true, type: 'boolean' })
  private bFactor: boolean;

  @Column({ name: 'is_square', nullable: true, type: 'boolean' })
  private isSquare: boolean;

  @Column({ name: 'a_square_factor', nullable: true, type: 'boolean' })
  private aSquareFactor: boolean;

  @Column({ name: 'b_square_factor', nullable: true, type: 'boolean' })
  private bSquareFactor: boolean;

  @Column({ name: 'c_square_factor', nullable: true, type: 'boolean' })
  private cSquareFactor: boolean;

  @ManyToOne(() => TaxConfig, (taxConfig) => taxConfig.taxRules)
  @JoinColumn({ name: 'tax_config_id' })
  private taxConfig: TaxConfig;

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

  public getAFactor(): boolean {
    return this.aFactor;
  }

  public setAFactor(aFactor: boolean): void {
    this.aFactor = aFactor;
  }

  public getBFactor(): boolean {
    return this.bFactor;
  }

  public setBFactor(bFactor: boolean): void {
    this.bFactor = bFactor;
  }
}
