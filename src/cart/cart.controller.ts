import { Controller, Body, Get, Post, NotFoundException, Headers, UseInterceptors, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CartDto } from './dtos/cart.dto';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';

@Controller('/cart')
@UseInterceptors(FileInterceptor(''))
@Serialize(CartDto)
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
    if (!body) {
      throw new NotFoundException('No product provided in the request body');
    }
    return this.cartService.postProductsToCart(body.productID , token);
  }


  // [ 3 ] DELETE PRODUCT FROM THE CART
  @Delete()
  async deleteProductFromCart (@Headers('authorization') header : any , @Body() body: any ) {
    const token = header?.replace('Bearer ', '');
    if (!body) {
      throw new NotFoundException('No product provided in the request body');
    }
    return this.cartService.deleteProductFromCart(body.productID , token);
  }
}          
