import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dtos/signUp.dto';
import { UserRepository } from 'src/repository/user.repository';
import { LoginDto } from './dtos/login.dto';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('jwt.secret'),
      passReqToCallback: true,
    });
  }

  tokenExpired(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return false;
    } catch (error) {
      return true;
    }
  }

  async validate(userId: string): Promise<any> {
    try {
      console.log(userId);
      return this.userRepository.findById(userId);
    } catch (error) {
      throw new UnauthorizedException('User not found');
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const user = await this.userRepository.signUp(signUpDto);
    const token = await this.jwtService.signAsync(
      { id: user.id },
      { secret: this.configService.get<string>('jwt.secret') },
    );
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const user = await this.userRepository.logIn(loginDto);
      const token = await this.jwtService.signAsync(
        { id: user.id },
        { secret: this.configService.get<string>('jwt.secret') },
      );
      return { token };
    } catch (error) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  generateLoginToken(userId: string, expiryLimit: string) {
    return this.jwtService.sign({ userId }, { expiresIn: expiryLimit });
  }
}
