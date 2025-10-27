import { BadRequestException, Body, Controller, NotImplementedException, Post, Session, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { UserResponceDto } from 'src/user/dtos/user.dto';
import { SignupDto } from './dtos/signup.dtos';
import { CurrentUserInterceptor } from 'src/user/interceptors/current_user.interceptor';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToClass } from 'class-transformer';

@Controller('auth')
@Serialize(UserResponceDto)
export class AuthController {
  constructor(private authService : AuthService){}
  
  
  
  // =============== > SIGNUP
  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('image', {
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
  async signup(@Body() body: any, @UploadedFile() file?: Express.Multer.File) {
    const bodyData = plainToClass(SignupDto, body);

    // attach uploaded image path to the user body
    if (!file) {
      throw new BadRequestException('Image file is required for signup');
    }

    const userData = {
      ...bodyData,
      image: `/uploads/${file.filename}`
    };
    
    const user = await this.authService.signup(userData);
    return user;
  }




  // =============== > LOGIN
  @Post('/login')
  @UseInterceptors(CurrentUserInterceptor)
  @UseInterceptors(FileInterceptor(''))
  async login(@Body() body : LoginDto , @Session() session : any){
    const {email , password} = body
    const user = await this.authService.login(email , password)
    session.userToken = user.token;
    return user;
  }


  
  // =============== > LOGOUT
  @Post('/logout')
  async logout(@Session() session: any) {
    delete session.userToken;

    return {
      status: 'success',
      message: 'Logged Out Successfully',
      data: null
    };
  }
}
