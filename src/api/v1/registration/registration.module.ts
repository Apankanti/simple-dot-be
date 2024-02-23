import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoginModule } from '../login';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { AuthModule } from 'src/common/auth/auth.module';
import { UserRepository } from 'src/repository/user.repository';

@Module({
  imports: [AuthModule, ConfigModule, SequelizeModule, LoginModule],
  controllers: [RegistrationController],
  providers: [RegistrationService, UserRepository],
  exports: [RegistrationService],
})
export class RegistrationModule {}
