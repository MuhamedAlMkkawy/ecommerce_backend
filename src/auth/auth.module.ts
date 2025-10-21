import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEntity } from './entities/auth.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports : [TypeOrmModule.forFeature([AuthEntity])]
})
export class AuthModule {}
