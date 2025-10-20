import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly repo:ProductsService ){}

  // GET PRODUCTS
  @Get()
  async getProducts (){
    const products = await this.repo.getProducts()

    return products;
  }



  // GET PRODUCT




  // POST PRODUCT
  @Post()
  async addProduct (@Body() body:CreateProductDto ){
    const product = await this.repo.addProduct(body);

    return product;
  }

  // UPDATE PRODUCT





  // DELETE PRODUCT

}
