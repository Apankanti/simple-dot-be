import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from '../products';

type CreationColumns = 'productId' | 'userId';
export type CreateWishListParams = Pick<WishListBase, CreationColumns>;

@Table({ tableName: 'tbl_Wish_list', underscored: true, timestamps: true })
export class WishListBase extends Model<WishListBase, CreateWishListParams> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  productId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;
}
