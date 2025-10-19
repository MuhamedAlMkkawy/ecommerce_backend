import { Body, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {HomeEnitiy} from '../home/entities/home.entity'
import { HomeDto } from './dtos/create-home.dto';


@Injectable()
export class HomeService {
  constructor(@InjectRepository(HomeEnitiy) private repo : Repository<HomeEnitiy>){}

  // VIEW THE HOME DATA FOR CLIENT
  getHomeData(){
    const data = this.repo.find();

    return data;
  }


  // ADD THE HOME DATA FROM ADMIN
  async createHomeData(@Body() body: HomeDto){
    const home = this.repo.create(body);
    const savedData = await this.repo.save(home);
    return {
      status : 'success',
      message : 'Data Sent Successfully',
      data : savedData
    }
  }


  async findProduct(id:string){
    const product = await this.repo.findOne({ where: { id } });
    return {
      status : 'success',
      message : 'Data Sent Successfully',
      data : product
    }
  }
}
