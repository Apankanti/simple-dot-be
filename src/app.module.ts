import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryModule } from './repository';
import { JwtService } from '@nestjs/jwt';
import configuration from './config/app.config';
import { ModelsModule } from './models';
import { ProductModule } from './api/v1/products/products.module';
import { UserModule } from './api/v1/user/user.module';
import { AuthModule } from './common/auth/auth.module';
import { AuthService } from './common/auth/auth.service';
import { ScheduleModule } from '@nestjs/schedule';
import { APIModule } from './api/v1/api-v1.routes';
import { validate } from './config/env.validation';
import { DbModule } from './core/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    DbModule,
    ScheduleModule.forRoot(),
    ModelsModule,
    ...APIModule,
    UserModule,
    ProductModule,
    RepositoryModule,
    AuthModule,
  ],
  providers: [ConfigService, AuthService, JwtService],
})
export class AppModule {}
