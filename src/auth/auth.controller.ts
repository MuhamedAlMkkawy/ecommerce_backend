import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dtos';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
@Serialize(SignupDto)
export class AuthController {
  constructor(private authService : AuthService){}



  // =============== > SIGNUP
  @Post('/signup')
  async signup (@Body() body : any) {
    const user = await this.authService.signup(body)


    return user;
  }




  // =============== > LOGIN
  @Post('/login')
  async login(@Body() body : any){
    const {email , password} = body
    const user = await this.authService.login(email , password)

    return user;
  }
}
