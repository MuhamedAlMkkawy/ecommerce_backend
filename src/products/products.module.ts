import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entities';

@Module({
  exports : [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService],
  imports : [TypeOrmModule.forFeature([ProductsEntity])],
})
export class ProductsModule {}
