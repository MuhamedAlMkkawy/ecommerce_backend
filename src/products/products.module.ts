import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entities';
import { UserEntity } from 'src/user/entities/user.entities';
import { CartEntity } from 'src/cart/entities/cart.entities';
import { UserModule } from 'src/user/user.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  exports : [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService],
  imports : [
    TypeOrmModule.forFeature([ProductsEntity , UserEntity , CartEntity]) , 
  ],
})
export class ProductsModule {}
