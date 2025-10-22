import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { UserResponceDto } from 'src/user/dtos/user.dto';
import { SignupDto } from './dtos/signup.dtos';

@Controller('auth')
@UseInterceptors(FileInterceptor(''))
@Serialize(UserResponceDto)
export class AuthController {
  constructor(private authService : AuthService){}
  
  
  
  // =============== > SIGNUP
  @Post('/signup')
  async signup (@Body() body : SignupDto) {
    const user = await this.authService.signup(body)


    return user;
  }




  // =============== > LOGIN
  @Post('/login')
  async login(@Body() body : LoginDto){
    const {email , password} = body
    const user = await this.authService.login(email , password)

    return user;
  }
}
