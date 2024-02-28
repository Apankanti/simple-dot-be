import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

interface Size {
  XS?: {
    width: string;
    length: string;
  };
  S?: {
    width: string;
    length: string;
  };
  M?: {
    width: string;
    length: string;
  };
  L?: {
    width: string;
    length: string;
  };
  XL?: {
    width: string;
    length: string;
  };
  XXL?: {
    width: string;
    length: string;
  };
}

type CreationColumns =
  | 'category'
  | 'productType'
  | 'title'
  | 'descriptionFit'
  | 'color'
  | 'images'
  | 'price';
export type CreateProductParams = Pick<ProductBase, CreationColumns>;

@Table({ tableName: 'tbl_products', underscored: true })
export class ProductBase extends Model<ProductBase, CreateProductParams> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productType: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  descriptionFit: {
    description: string;
    size?: Size;
    sleeveLength: string;
    fit: string;
    neckline: string;
  };

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
  })
  images: string[];

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt?: Date;
}
