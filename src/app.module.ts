import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeEnitiy } from './home/entities/home.entity';
import { ProductsModule } from './products/products.module';
import { ProductsEntity } from './products/entities/products.entities';
import { CartModule } from './cart/cart.module';
import { CartEntity } from './cart/entities/cart.entities';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entities';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      autoLoadEntities: true,
      synchronize: true,
      entities : [HomeEnitiy , ProductsEntity ,CartEntity , UserEntity],
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env',
    }),
    HomeModule,
    ProductsModule,
    CartModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
