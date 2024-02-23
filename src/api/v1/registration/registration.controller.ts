import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { RegistrationService } from './registration.service';
import {
  CreateUserReqDto,
  CreateUserResponseDto,
} from './dtos/create-user.dto';

@Controller()
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async createUser(
    @Body() user: CreateUserReqDto,
  ): Promise<CreateUserResponseDto> {
    return this.registrationService.createNewUser(user);
  }
}
