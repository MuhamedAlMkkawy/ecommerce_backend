import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService:ProductsService ){}

  // GET PRODUCTS
  @Get()
  async getProducts (){
    const products = await this.productService.getProducts()

    return products;
  }



  // GET PRODUCT
  @Get("/:id")
  async getProduct (@Param('id' , ParseIntPipe) id:number){
    const product = await this.productService.getProduct(id)

    return product;
  }


  // POST PRODUCT
  @Post()
  async addProduct (@Body() body:CreateProductDto ){
    const product = await this.productService.addProduct(body);
    return product;
  }


  // UPDATE PRODUCT





  // DELETE PRODUCT

}
