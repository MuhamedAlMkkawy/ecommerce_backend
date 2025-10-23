import { Controller, Body, Get, Post, NotFoundException, Headers, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/cart')
@UseInterceptors(FileInterceptor(''))
export class CartController {
  constructor(private cartService : CartService) {}

  // [ 1 ] => Get Products From Cart
  @Get()
  async getCartItems (@Headers('authorization') header : any) {
    const token = header?.replace('Bearer ', '');
    const userCart = await this.cartService.getCartItems(token);

    if(!userCart) {
      throw new NotFoundException('No Products in Cart Yet!!!')
    }
    return userCart
  }

  // [ 2 ] => Post Products To Cart
  @Post()
  async postProductsToCart (@Headers('authorization') header : any , @Body() body: any ) {
    const token = header?.replace('Bearer ', '');
    console.log('Product to add:', body);
    if (!body) {
      throw new NotFoundException('No product provided in the request body');
    }
    return this.cartService.postProductsToCart(body , token);
  }

}          
