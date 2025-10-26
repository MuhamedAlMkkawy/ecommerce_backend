import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entities';
import { CartEntity } from 'src/cart/entities/cart.entities';
import { ProductsEntity } from 'src/products/entities/products.entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  exports : [UserService],
  controllers: [UserController],
  providers: [UserService],
  imports : [
    TypeOrmModule.forFeature([UserEntity , CartEntity , ProductsEntity]) , 
    JwtModule
  ]
})
export class UserModule {}
