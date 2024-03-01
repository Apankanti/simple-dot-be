import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from './dtos';
import { LoginService } from './login.service';

@Controller('auth')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    description: 'User login successful',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid login credentials.',
  })
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
