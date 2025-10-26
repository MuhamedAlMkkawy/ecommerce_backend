import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entities';
import { Repository } from 'typeorm';
import { ProductsEntity } from 'src/products/entities/products.entities';
import { UserEntity } from 'src/user/entities/user.entities';

@Injectable()
export class CartService {
  constructor (
    @InjectRepository(CartEntity) 
    private cart : Repository<CartEntity>,
    @InjectRepository(ProductsEntity)
    private products : Repository<ProductsEntity>,
    @InjectRepository(UserEntity)
    private user : Repository<UserEntity>,
  ){}

  // [ 1 ] => Get Products From Cart
  async getCartItems (userToken : string) {
    const userInfo = await this.user.findOne({
      where : {token : userToken},
      relations : ['cart']
    })

    if(!userInfo){
      throw new NotFoundException('This User isnt Found')
    }

    const userCart = await this.cart.findOne({
      where : { user : { id : userInfo.id } },
      relations : [ 'user' ,'products'] 
    })

    console.log('###########')
    console.log(userCart)
    console.log('###########')
    if(!userCart) {
      throw new NotFoundException('No Products in Cart Yet!!!')
    }

    return userCart;
  }

  // [ 2 ] => Post Products To Cart
  async postProductsToCart (productID : number , userToken : string) {
    // [ 1 ] GET THE USER INFORAMTION FROM THE USER REPOSITORY
    const userInfo = await this.user.findOne({ 
      where: { token: userToken },
      relations: ['cart']
    });

    // console.log(userInfo)
    if(!userInfo){
      throw new NotFoundException("User not found")
    }

    // [ 2 ] GET THE CART OF THE USER FORM THE CART REPOSITORY WITH ITS RELATIONS
    let userCart = await this.cart.findOne({
      where : { user: { id: userInfo.id } },
      relations: ['user' ,'products']
    });

    if(!userCart){
      const newCart = this.cart.create({user : userInfo , products : []})
      userCart = await this.cart.save(newCart)
    }

    // [ 3 ] GET THE PRODUCT FROM THE PRODUCTS REPOSITORY
    const product = await this.products.findOneBy({id : productID})

    if(!product){
      throw new NotFoundException("This Product isn't Found")
    }



    // [ 4 ] CHECK IF THE ALREADY ADDED TO THE CART 
    if(userCart.products.some(p => p.id === product.id)){
      throw new NotFoundException('This product is Already in the cart!!!')
    }
    userCart.products.push(product)
    return this.cart.save(userCart)
  }



  // [ 3 ] => Delete Products From Cart
  async deleteProductFromCart (productID : number , userToken : string) {
    const userInfo = await this.user.findOne({
      where : {token : userToken},
      relations : ['cart']
    })

    if(!userInfo){
      throw new NotFoundException('The User Is Not Found')
    }

    let userCart = await this.cart.findOne({
      where : { user: { id: userInfo.id } },
      relations: ['user' ,'products']
    });


    if (!userCart) {
      throw new NotFoundException('Cart not found');
    }

    if (!userCart.products || userCart.products.length === 0) {
      throw new NotFoundException('No products in the cart');
    }

    // Find product index in cart
    const productIndex = userCart.products.findIndex(p => p.id == productID);
    
    if (productIndex === -1) {
      throw new NotFoundException('Product not found in cart');
    }

    // Remove product from cart array
    userCart.products.splice(productIndex, 1);

    // Save the updated cart
    await this.cart.save(userCart);

    // Return updated cart with products
    const updatedCart = await this.cart.findOne({
      where: { id: userCart.id },
      relations: ['user' , 'products'],
    });

    return updatedCart;
  }
}
