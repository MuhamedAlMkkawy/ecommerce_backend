import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeEnitiy } from './home/entities/home.entity';
import { ProductsModule } from './products/products.module';
import { ProductsEntity } from './products/entities/products.entities';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'sqlite',
      database : 'db.sqlite',
      entities : [HomeEnitiy , ProductsEntity],
      synchronize : true
    }),
    HomeModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
