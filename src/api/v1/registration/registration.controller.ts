import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { RegistrationService } from './registration.service';
import {
  CreateUserReqDto,
  CreateUserResponseDto,
} from './dtos/create-user.dto';

@Controller('auth')
@ApiTags('Registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User registration' })
  @ApiOkResponse({
    description: 'User registered successfully',
    type: CreateUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Please check the request payload.',
  })
  async createUser(
    @Body() user: CreateUserReqDto,
  ): Promise<CreateUserResponseDto> {
    return this.registrationService.createNewUser(user);
  }
}
