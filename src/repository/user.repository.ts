// user.repository.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/models/user/user.model';
import { SignUpDto } from 'src/auth/dtos/signUp.dto';
import { LoginDto } from 'src/auth/dtos/login.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

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

  async logIn(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password,
    );
    console.log(isPasswordValid, user);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }
    return user;
  }
}
