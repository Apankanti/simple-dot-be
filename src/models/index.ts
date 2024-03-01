import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthToken } from './auth-token.model';
import { User } from './user';
import { Product } from './products';
import { WhishList } from './wish-list';

const models = [WhishList, AuthToken, User, Product];
@Global()
@Module({
  imports: [SequelizeModule.forFeature(models)],
  exports: [SequelizeModule.forFeature(models)],
})
export class ModelsModule {}

export * from './auth-token.model';
export * from './user/user.model';
export * from './wish-list/wish-list.model';
export * from './products/products.model';
