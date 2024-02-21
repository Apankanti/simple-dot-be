import { Injectable } from '@nestjs/common';

import { SignUpDto } from 'src/auth/dtos/signUp.dto';
import { User } from 'src/models/user/user.model';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserRequestDto: SignUpDto): Promise<User> {
    return this.userRepository.signUp(createUserRequestDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
