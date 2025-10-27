import { BadRequestException, Body, Controller, Delete, Get, Headers, NotFoundException, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { UserResponceDto } from './dtos/user.dto';
import { plainToClass } from 'class-transformer';
import { UpdateProfileDto } from './dtos/update_profile.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/profile')
@UseInterceptors(FileInterceptor(''))
@Serialize(UserResponceDto)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService : UserService){}


  // [ 1 ] Get the Profile Data
  @Get('')
  async getProfile(@Headers('authorization') header : any) {
    const token = header?.replace('Bearer ', '');

    const userData = await this.userService.getProfileData(token)

    if(!userData){
      throw new NotFoundException('User Not Found')
    }
    
    return userData;
  }
  
  // [ 2 ] UPDATE THE PROFILE DATA
  @Patch('')
  async updateProfileData(@Headers('authorization') header: string, @Body() body: string) {
    const token = header?.replace('Bearer ', '');
    
    if (!body) {
      throw new BadRequestException('No body provided');
    }
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    const updateProfileData = plainToClass(UpdateProfileDto, parsedBody);
    const userData = await this.userService.updateProfileData(token, updateProfileData);
    
    return userData;
  }
  
  
  // [ 3 ] DELETE THE PROFILE
  @Delete()
  async deleteProfile (@Headers('authorization') header: string) {
    const token = header?.replace('Bearer ', '');
    
    const deletedUser = await this.userService.deleteProfile(token)

    return deletedUser;
  }
}
