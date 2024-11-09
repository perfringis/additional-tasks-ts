import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderLine } from './order.line.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ name: 'price', nullable: true, type: 'int' })
  private price: number;

  @Column({ name: 'product', nullable: true, type: 'varchar', length: 255 })
  private product: string;

  @Column({ name: 'counter', nullable: true, type: 'int' })
  private counter: number;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.product)
  public items: OrderLine[];

  public decrementCounter(): void {
    this.counter--;
  }

  public incrementCounter(): void {
    this.counter++;
  }
}
