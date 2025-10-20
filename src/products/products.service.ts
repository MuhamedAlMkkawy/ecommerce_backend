import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductsEntity } from './entities/products.entities';
import { CreateProductDto } from './dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductsEntity) private repo : Repository<ProductsEntity>){}

  // GET PRODUCTS
  async getProducts(){
    const products = await this.repo.find()

    if(!products){
      throw new NotFoundException('No Products Found yet')
    }


    return products;
  }



  // GET PRODUCT




  // POST PRODUCT
  async addProduct(@Body() body : CreateProductDto){
    const addedproduct = this.repo.create(body);
    const product = await this.repo.save(addedproduct)

    
    return product
  }


  // UPDATE PRODUCT





  // DELETE PRODUCT
}
