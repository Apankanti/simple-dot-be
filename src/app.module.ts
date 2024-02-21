import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryModule } from './repository';
import { JwtService } from '@nestjs/jwt';
import configuration from '../config/app.config';
import { AuthController } from './api/auth/auth.controller';
import { AuthModule } from './api/auth/auth.module';
import { AuthService } from './api/auth/auth.service';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'SimpleEcommerce',
      models: [User],
      autoLoadModels: true,
    }),
    UserModule,
    RepositoryModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [ConfigService, AuthService, JwtService],
})
export class AppModule {}
