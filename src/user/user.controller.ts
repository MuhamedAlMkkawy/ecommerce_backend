import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private userService : UserService){}


  // [ 1 ] Get the Profile Data
  // @Get('/profile')
  // async getProfile() {
  //   const userData = 
  // }
}
