import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({ name: 'order_line' })
export class OrderLine {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ name: 'price', nullable: true, type: 'int' })
  private price: number;

  @ManyToOne(() => Order, (order) => order.items, { eager: true })
  @JoinColumn({ name: 'order_id' })
  public order: Order;

  @ManyToOne(() => Product, (product) => product.items, { eager: true })
  @JoinColumn({ name: 'product_id' })
  public product: Product;

  @Column({ name: 'quantity', nullable: true, type: 'int' })
  private quantity: number;

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getProduct(): Product {
    return this.product;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getOrder(): Order {
    return this.order;
  }

  public setOrder(order: Order): void {
    this.order = order;
  }
}
