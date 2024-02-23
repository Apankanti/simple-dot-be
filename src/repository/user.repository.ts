import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { FindOptions, Transaction } from 'sequelize';
import { LoginDto } from 'src/common/auth/dtos/login.dto';
import { SignUpDto } from 'src/common/auth/dtos/signUp.dto';
import { CreateUserParams } from 'src/models/user';
import { User } from 'src/models/user/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(
    user: CreateUserParams,
    createUserTransaction: Transaction,
  ): Promise<User> {
    return this.userModel.create(user, { transaction: createUserTransaction });
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { firstName, lastName, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  }

  async getHashPass(password: string): Promise<string> {
    const passSalt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, passSalt);
    return passHash;
  }

  async logIn(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid, user);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }
    return user;
  }
  async findOneByClause(clause: FindOptions<User>) {
    return this.userModel.findOne(clause);
  }
  // async findById(id: string): Promise<User> {
  //   return this.userModel.findByPk(id);
  // }
}
