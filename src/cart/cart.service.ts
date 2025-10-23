import { Injectable, NotFoundException, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entities';
import { Repository } from 'typeorm';
import { ProductsEntity } from 'src/products/entities/products.entities';
import { ProductsService } from 'src/products/products.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CartService {
  constructor (
    @InjectRepository(CartEntity) 
    private cart : Repository<CartEntity>,
    
    private productsService : ProductsService,
    private UserService : UserService,
  ){}

  // [ 1 ] => Get Products From Cart
  async getCartItems (userToken : string) {
    const userCart = await this.cart.findOne({
      where: { user: { token : userToken } },
      relations: ['user', 'products'] 
    });
    if(!userCart){
      throw new NotFoundException('Nothing Found in the cart yet!!')
    }
    return userCart;
  }

  // [ 2 ] => Post Products To Cart
  async postProductsToCart (product : ProductsEntity , userToken : string) {
    const userCart = await this.cart.findOne({
      where: { user: { token : userToken } },
      relations: ['user', 'products'] 
    });


    if (userCart) {
      userCart.products.push(product);
      return this.cart.save(userCart);
    }

    const newCart = this.cart.create({
      products: [product],
      user: { token : userToken },
    });
    return this.cart.save(newCart);
  }

  // [ 3 ] => Delete Products From Cart
}
