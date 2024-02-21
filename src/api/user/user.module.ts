/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRepository } from 'src/repository/user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/models/User/user.model';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [AuthModule, SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
