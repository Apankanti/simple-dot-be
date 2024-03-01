import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/User/user.model';
import { UserRepository } from './user.repository';
import { Product } from 'src/models/products/products.model';
import { ProductRepository } from './products.repository';
import { AuthTokenRepository } from './auth-token.repository';
import { WishListRepository } from './add-to-wish-list.repository';
import { WhishList } from 'src/models';

const repositories = [
  WishListRepository,
  UserRepository,
  ProductRepository,
  AuthTokenRepository,
];

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User, Product, WhishList])],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
