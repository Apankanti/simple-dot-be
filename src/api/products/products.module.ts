/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Product } from 'src/models/products/products.model';
import { ProductController } from './products.controller';
import { ProductRepository } from 'src/repository/products.repository';
import { ProductService } from './products.service';
@Module({
  imports: [AuthModule, SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class UserModule {}
