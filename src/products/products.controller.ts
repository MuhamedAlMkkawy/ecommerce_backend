import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post, 
  UploadedFiles, 
  UseGuards, 
  UseInterceptors
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from 'src/guards/auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
@UseInterceptors(
  FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }),
)
@UseGuards(AuthGuard)
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
  async addProduct (@Body() body:any  , @UploadedFiles() files: Express.Multer.File[]){
    const bodyData = plainToClass(CreateProductDto, body);
    const product = await this.productService.addProduct(bodyData , files);
    return product;
  }


  // ==============> UPDATE PRODUCT
  @Patch(':id')
  async updateProduct (@Param('id' , ParseIntPipe) id: number  , @Body() body: any , @UploadedFiles() files: Express.Multer.File[]){
    const updatedBody = plainToClass(UpdateProductDto, body);
    const product = await this.productService.updateProduct(id , updatedBody , files);

    return product;

  }



  // ==============> DELETE PRODUCT

  @Delete('/:id')
  async deleteProduct (@Param('id' , ParseIntPipe) id : number){
    const product = await this.productService.deleteProduct(id)

    return product;
  }
}
