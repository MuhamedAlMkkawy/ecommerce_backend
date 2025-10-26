import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entities';
import { CartEntity } from 'src/cart/entities/cart.entities';
import { ProductsEntity } from 'src/products/entities/products.entities';
import { CartModule } from 'src/cart/cart.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  exports : [UserService],
  controllers: [UserController],
  providers: [UserService],
  imports : [
    TypeOrmModule.forFeature([UserEntity , CartEntity , ProductsEntity]) , 
  ]
})
export class UserModule {}
