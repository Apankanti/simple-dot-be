import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/common/auth/dtos/signUp.dto';
import { CreateUserParams } from 'src/models/user';
import { User } from 'src/models/user/user.model';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserRequestDto: SignUpDto): Promise<User> {
    return this.userRepository.signUp(createUserRequestDto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(email: CreateUserParams) {
    return `This action updates a #${email} user`;
  }

  remove(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
