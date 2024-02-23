import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { RepositoryModule } from '../../../repository';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [AuthModule, ConfigModule, RepositoryModule],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
