import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entities';
import { UserService } from 'src/user/user.service';
import { ProductsService } from 'src/products/products.service';
import { ProductsEntity } from 'src/products/entities/products.entities';
import { UserEntity } from 'src/user/entities/user.entities';
import { UserModule } from 'src/user/user.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports : [
    TypeOrmModule.forFeature([CartEntity , ProductsEntity , UserEntity]) , 
    UserModule , 
    ProductsModule
  ],
  exports : [CartService]
})
export class CartModule {}
