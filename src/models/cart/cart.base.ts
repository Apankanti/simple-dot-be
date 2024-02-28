import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from '../products';

type CreationColumns = 'productId' | 'quantity';

export type CreateCartParams = Pick<CartBase, CreationColumns>;

@Table({ tableName: 'tbl_carts', underscored: true })
export class CartBase extends Model<CartBase, CreateCartParams> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Product)
  @Column
  productId?: string;

  @Column
  quantity: string;
}
