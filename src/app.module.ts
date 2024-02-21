import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user/user.model';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository';
import { JwtService } from '@nestjs/jwt';
import configuration from '../config/app.config';

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
