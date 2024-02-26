import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthModule } from './jwt.module';
import { RepositoryModule } from 'src/repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    JwtAuthModule,
    RepositoryModule,
  ],
  providers: [AuthService],
  exports: [JwtAuthModule, AuthService],
})
export class AuthModule {}
