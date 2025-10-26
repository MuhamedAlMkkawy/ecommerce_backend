import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entities';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dtos/update_profile.dto';

const scrypt = promisify(crypto.scrypt);


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo : Repository<UserEntity>,
    private jwtService : JwtService
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




  // [ 3 ] GET PROFILE DATA 
  async getProfileData (userToken : string){
    const user = await this.repo.findOneBy({token : userToken})
    
    if(!user){
      throw new NotFoundException('User Not Found!!')
    }

    return user;
  } 



  // [ 4 ] UPDATE PROFILE DATA
  async updateProfileData(userToken : string , body : UpdateProfileDto){
    const user = await this.repo.findOneBy({token : userToken})

    if(!user){
      throw new NotFoundException('User Not Found')
    }
    try{
      // Save and return the updated user
      await this.repo.update( user.id , body);
      const updatedUser = await this.repo.findOne({ where: { id: user.id } });
      return updatedUser;
    }catch(error){
      throw new BadRequestException(error)
    }
  }


  // [ 5 ] DELETE PROFILE 
  async deleteProfile (userToken : string) {
    const user = await this.repo.findOneBy({token : userToken})

    if(!user){
      throw new BadRequestException('User Not Found !!')
    }


    try{
      const deletedUser = await this.repo.delete(user.id);
      return {
        message : `${user.name} is deleted successfully`,
        deletedUserId : deletedUser.raw.id
      }
    }catch(error){
      if(error.code === 'SQLITE_CONSTRAINT'){
        throw new BadRequestException('Cannot delete user because it is associated with other records')
      }else{
        throw new NotFoundException(error.message)
      }
    }
  }
}
