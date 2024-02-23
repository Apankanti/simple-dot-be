import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { AuthToken, CreateAuthTokenParams } from 'src/models/auth-token.model';

@Injectable()
export class AuthTokenRepository {
  constructor(
    @InjectModel(AuthToken)
    private authTokenModel: typeof AuthToken,
  ) {}

  async createAuthToken(
    authToken: CreateAuthTokenParams,
    createAuthTokenTransaction: Transaction,
  ): Promise<AuthToken> {
    return this.authTokenModel.create(authToken, {
      transaction: createAuthTokenTransaction,
    });
  }
}
