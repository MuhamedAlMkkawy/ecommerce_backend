import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeDto } from './dtos/create-home.dto';

@Controller('/home')
export class HomeController {
  constructor (private homeService : HomeService){}


  @Get()
  async getHomeData(){
    const data = await this.homeService.getHomeData();
    
    if(!data || data.length == 0){
      throw new NotFoundException('No data found');
    }

    return data;
  }


  @Post()
  async createHomeData (@Body() body: HomeDto){
    const data = await this.homeService.createHomeData(body);

    return data;
  }



  // @Get('/:id')
  // async getProduct(@Param('id') id: string){
  //   const product = await this.homeService.findProduct(id)

  //   if (!product) {
  //     throw new NotFoundException(`Product with id ${id} not found`);
  //   }

  //   return product;
  // }
}
