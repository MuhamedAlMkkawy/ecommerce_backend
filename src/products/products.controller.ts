import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post 
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService:ProductsService ){}

  // ==============> GET PRODUCTS
  @Get()
  async getProducts (){
    const products = await this.productService.getProducts()

    return products;
  }



  // ==============> GET PRODUCT
  @Get("/:id")
  async getProduct (@Param('id' , ParseIntPipe) id:number){
    const product = await this.productService.getProduct(id)

    return product;
  }


  // ==============> POST PRODUCT
  @Post()
  async addProduct (@Body() body:any ){
    console.log(body)
    const product = await this.productService.addProduct(body);
    return product;
  }


  // ==============> UPDATE PRODUCT
  @Patch(':id')
  async updateProduct (@Param('id' , ParseIntPipe) id: number  , @Body() body: UpdateProductDto) {
    
    const product = await this.productService.updateProduct(id , body)

    return product;

  }



  // ==============> DELETE PRODUCT

  @Delete('/:id')
  async deleteProduct (@Param('id' , ParseIntPipe) id : number){
    const product = await this.productService.deleteProduct(id)

    return product;
  }
}
