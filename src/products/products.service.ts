import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductsEntity } from './entities/products.entities';
import { CreateProductDto } from './dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductsEntity) private repo : Repository<ProductsEntity>){}

  // ======================> GET PRODUCTS
  async getProducts(){
    const products = await this.repo.find()

    if(!products){
      throw new NotFoundException('No Products Found yet')
    }


    return products;
  }



  // ======================> GET PRODUCT
  async getProduct (id : number){
    const product = await this.repo.findOneBy({id});

  
    if(!product){
      throw new NotFoundException("Product You looked for isn't Found 😥")
    }
    
    return product
  }



  // ======================> POST PRODUCT
  async addProduct(body:CreateProductDto , files?: Express.Multer.File[]){
    try{
      // Convert uploaded files to URLs
      const images = files?.length
        ? files.map((file) => `/uploads/${file.filename}`)
        : ['/uploads/default.png']; // fallback if no images

      const addedProduct = this.repo.create({
        ...body,
        images, // ✅ store URLs
      });

      const product = await this.repo.save(addedProduct);

      if (!product) {
        throw new NotFoundException("Product you looked for isn't found 😥");
      }

      
      return product
    } 
    catch(error) {
      console.error(error);
      throw error;
    }
  }


  // ======================> UPDATE PRODUCT
  async updateProduct (id : number, body : UpdateProductDto , files?: Express.Multer.File[]){
    try{
      const exisitingProduct = this.repo.findOneBy({id})

      if(!exisitingProduct){
        throw new NotFoundException("Product You looked for isn't Found 💔")
      }

      const images = files?.length
        ? files.map((file) => `/uploads/${file.filename}`)
        : undefined; // keep existing images if no new files

      if (images) {
        body.images = images; // update images only if new files are uploaded
      }
      
      await this.repo.update(id, body)
      const product = await this.repo.findOneBy({id})
      return product
    }
    catch(error){
      console.error(error)
    }
  }




  // ======================> DELETE PRODUCT

  async deleteProduct(id : number){
    try{
      const exisitingProduct = await this.repo.findOneBy({id})
      
      if(!exisitingProduct){
        throw new NotFoundException("Product You looked for isn't Found 💔")
      }

      const product = await this.repo.delete({id})

      return {message : `${product} is Deleted...`};
    }
    catch (error) {
      console.error('ERROR from delete product service' , error)
    }
  }
}
