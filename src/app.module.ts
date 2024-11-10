import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Order } from './order.entity';
import { CustomerOrderGroup } from './customer.order.group.entity';
import { OrderLine } from './order.line.entity';
import { Product } from './product.entity';
import { TaxConfig } from './tax.config.entity';
import { TaxRule } from './tax.rule.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT, 10)
        : 3456,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [
        Customer,
        CustomerOrderGroup,
        Order,
        OrderLine,
        Product,
        TaxConfig,
        TaxRule,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
