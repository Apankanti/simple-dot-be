import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from '../../../repository';
import { AuthModule } from 'src/common/auth/auth.module';
import { AddToWishListController } from './add-to-wish-list.controller';
import { AddToWishListService } from './add-to-wish-list.service';
import { ProductService } from '../products';
import { UserService } from '../user/user.service';

@Module({
  imports: [AuthModule, ConfigModule, RepositoryModule],
  controllers: [AddToWishListController],
  providers: [AddToWishListService, ProductService, UserService],
  exports: [AddToWishListService],
})
export class AddToWishListModule {}
