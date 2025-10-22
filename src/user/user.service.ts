import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo : Repository<UserEntity>
  ){}


  // [ 1 ] FIND THE USER FROM THE REPO TO CHECK IT IN THE AUTH PROCESSES
  async findUser (email : string) {
    const user = await this.repo.findBy({email})

    return user;
  }



  // [ 2 ] CERATE THE USER WITH THE SIGNUP PROCESS 
  async createUser(userData : object){
    const savedUser = this.repo.create(userData)

    const user = await this.repo.save(savedUser)

    return user;
  }




}
