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

type CreationColumns = 'firstName' | 'lastName' | 'email' | 'password';
export type CreateUserParams = Pick<UserBase, CreationColumns>;

@Table({ tableName: 'tbl_user', underscored: true })
export class UserBase extends Model<UserBase, CreateUserParams> {
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
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  emailVerified: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt?: Date;
}
