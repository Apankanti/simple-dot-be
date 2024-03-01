import { HasMany } from 'sequelize-typescript';
import { WishListBase } from './wish-list.base';

export class WhishList extends WishListBase {
  @HasMany(() => WishListBase, { foreignKey: 'userId' })
  wishList: WishListBase[];
}
