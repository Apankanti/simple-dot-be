import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('jwt.secret');
        const expiresIn = configService.get<string>('jwt.expireLimit');
        console.log('JWT Secret in jwt module:', secret);
        console.log('JWT Expires In:', expiresIn);
        if (!secret) {
          throw new Error('JWT secret is not defined');
        }
        return {
          secret: secret,
          signOptions: {
            expiresIn: expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class JwtAuthModule {}
