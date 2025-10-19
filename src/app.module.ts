import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeEnitiy } from './home/entities/home.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'sqlite',
      database : 'db.sqlite',
      entities : [HomeEnitiy],
      synchronize : true
    }),
    HomeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
