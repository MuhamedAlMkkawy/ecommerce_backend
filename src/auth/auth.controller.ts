import { Body, Controller, Post, Session, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { UserResponceDto } from 'src/user/dtos/user.dto';
import { SignupDto } from './dtos/signup.dtos';
import { CurrentUserInterceptor } from 'src/user/interceptors/current_user.interceptor';

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
  @UseInterceptors(CurrentUserInterceptor)
  async login(@Body() body : LoginDto , @Session() session : any){
    const {email , password} = body
    const user = await this.authService.login(email , password)
    session.userToken = user.token;
    return user;
  }


  
  // =============== > LOGOUT
  @Post('/logout')
  async logout(@Session() session : any){
    session.userToken = null;
    return {message : 'Logged Out Successfully'}
  }
}
