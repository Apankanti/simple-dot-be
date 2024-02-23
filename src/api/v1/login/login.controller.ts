import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginRequestDto, LoginResponseDto } from './dtos';
import { LoginService } from './login.service';
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUser: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.loginService.verifyLoginCredentials(
      loginUser.email,
      loginUser.password,
    );
    const tokenResp = await this.loginService.loginUser(user.id);
    return {
      emailVerified: user.emailVerified,
      ...tokenResp,
    };
  }
}
