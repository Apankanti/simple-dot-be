import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryModule } from './repository';
import { JwtService } from '@nestjs/jwt';
import configuration from './config/app.config';
import { AuthToken, ModelsModule, Product } from './models';
import { ProductModule } from './api/v1/products/products.module';
import { UserModule } from './api/v1/user/user.module';
import { AuthController } from './common/auth/auth.controller';
import { AuthModule } from './common/auth/auth.module';
import { AuthService } from './common/auth/auth.service';
import { ScheduleModule } from '@nestjs/schedule';
import { APIModule } from './api/v1/api-v1.routes';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'SimpleEcommerce',
      autoLoadModels: true,
      logging: false,
      models: [User, Product, AuthToken],
    }),
    ScheduleModule.forRoot(),
    ModelsModule,
    ...APIModule,
    UserModule,
    ProductModule,
    RepositoryModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [ConfigService, AuthService, JwtService],
})
export class AppModule {}
