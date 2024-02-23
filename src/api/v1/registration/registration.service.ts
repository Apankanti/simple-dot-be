import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EXCEPTION } from 'src/common/constants/common';
import { CreateUser } from 'src/common/interfaces/create-user.interface';
import { validatePassword } from 'src/common/utils/password-rules.util';
import { User } from 'src/models';
import { UserRepository } from 'src/repository/user.repository';
import { CreateUserResponseDto } from './dtos/create-user.dto';
import { mapCreateUserParams } from '../registration/mappers/create-user-params.mapper';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sequelizeInstance: Sequelize,
  ) {}

  async createNewUser(user: CreateUser): Promise<CreateUserResponseDto> {
    const userRegisteredResponse: CreateUserResponseDto = {
      success: false,
    };

    try {
      if (await this.checkUserExist(user.email)) {
        throw new ConflictException(user.email);
      }

      if (!validatePassword(user.password)) {
        throw new BadRequestException(EXCEPTION.INSECURE_PASSWORD);
      }

      user.password = await this.userRepository.getHashPass(user.password);
      const createdUser = await this.sequelizeInstance.transaction(
        async (transaction: Transaction): Promise<User> => {
          const userCreated = await this.userRepository.createUser(
            {
              ...mapCreateUserParams(user),
            },
            transaction,
          );
          return userCreated;
        },
      );
      userRegisteredResponse.success = !!createdUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
    return userRegisteredResponse;
  }

  async checkUserExist(email: string): Promise<boolean> {
    try {
      const userExist = await this.userRepository.findOneByClause({
        where: {
          email: email.toLowerCase(),
        },
      });
      return !!userExist;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
