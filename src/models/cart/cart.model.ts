import { BelongsTo } from 'sequelize-typescript';
import { CartBase } from './cart.base';
import { ProductBase } from '../products';

export class Cart extends CartBase {
  @BelongsTo(() => ProductBase, { foreignKey: 'productId', targetKey: 'id' })
  product?: ProductBase;
}
