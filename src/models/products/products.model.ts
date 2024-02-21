import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

interface Size {
  [key: string]: {
    Width: string;
    Length: string;
  };
}

@Table({ tableName: 'products_table', underscored: true })
export class Product extends Model<Product> {
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
    size: Size;
    sleevelength: string;
    fit: string;
    neckline: string;
  };

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  images: string[];

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;
}
