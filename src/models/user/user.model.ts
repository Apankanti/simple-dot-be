import { HasMany } from 'sequelize-typescript';
import { UserBase } from './user.base';
import { WishListBase } from '../wish-list/wish-list.base';

export class User extends UserBase {
  @HasMany(() => WishListBase, { foreignKey: 'userId' })
  wishList: WishListBase[];
}
