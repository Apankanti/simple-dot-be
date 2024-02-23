import { IsNotEmpty } from 'class-validator';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
} from 'sequelize-typescript';

type CreationColumns = 'userId' | 'token' | 'refreshToken';
export type CreateAuthTokenParams = Pick<AuthToken, CreationColumns>;

@Table({
  tableName: 'tbl_auth_tokens',
  underscored: true,
})
export class AuthToken extends Model<AuthToken, CreateAuthTokenParams> {
  @PrimaryKey
  @IsUUID('all')
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  @Column
  id!: string;

  @IsNotEmpty()
  @Column
  userId!: string;

  @Column
  @IsNotEmpty()
  token!: string;

  @IsNotEmpty()
  @Default(true)
  @Column
  tokenActive!: boolean;

  @Column
  refreshToken!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @Column
  createdBy?: string;

  @Column
  updatedBy?: string;

  @Column
  deletedBy?: string;
}
