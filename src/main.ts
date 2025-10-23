import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform : true , 
      whitelist: true ,
      forbidNonWhitelisted: true
    }
  ));

  // TO MAKE TIMEOUT FOR THE SERVER REQUEST
  app.useGlobalInterceptors(new TimeoutInterceptor());

    // 👇 Interceptor لتوحيد رسائل النجاح
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 👇 Filter لتوحيد رسائل الخطأ
  app.useGlobalFilters(new AllExceptionsFilter());

  // TO MAKE THE APP USE THE COOKIE SESSIONS
  app.use(cookieSession({
    keys : ['userToken']
  }));


  
  await app.listen(3000);
}
bootstrap();

