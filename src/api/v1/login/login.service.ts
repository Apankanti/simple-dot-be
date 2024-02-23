import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { AuthService } from 'src/common/auth/auth.service';
import { User } from 'src/models/user';
import { UserRepository } from 'src/repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { Transaction } from 'sequelize';
import { AuthToken } from 'src/models/auth-token.model';
import { AuthTokenRepository } from 'src/repository/auth-token.repository';
import { LoginToken } from 'src/common/login.interface';

@Injectable()
export class LoginService {
  constructor(
    private readonly sequelizeInstance: Sequelize,
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly configService: ConfigService,
  ) {}

  async verifyLoginCredentials(email: string, pass: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneByClause({
        where: {
          email: email.toLowerCase(),
        },
      });
      if (!user) {
        throw new UnauthorizedException(email);
      } else {
        const verifyPass = await bcrypt.compare(pass, user.password);
        if (verifyPass) {
          return user;
        }
        throw new UnauthorizedException(email);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async loginUser(userId: string): Promise<LoginToken> {
    try {
      const token = this.authService.generateLoginToken(
        userId,
        this.configService.get<string>('jwt.expireLimit') ?? '',
      );
      const refreshToken = this.authService.generateLoginToken(
        userId,
        this.configService.get<string>('jwt.refreshTokenExpiry') ?? '',
      );
      await this.sequelizeInstance.transaction(
        async (createTokenTransaction: Transaction): Promise<AuthToken> => {
          const tokenRecord = await this.authTokenRepository.createAuthToken(
            {
              userId,
              token,
              refreshToken,
            },
            createTokenTransaction,
          );
          return tokenRecord;
        },
      );
      return {
        token,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
