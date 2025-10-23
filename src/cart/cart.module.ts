import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entities';
import { UserService } from 'src/user/user.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports : [
    TypeOrmModule.forFeature([CartEntity]) , 
    UserService , 
    ProductsService
  ]
})
export class CartModule {}
