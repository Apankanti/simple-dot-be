import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignUpDto } from 'src/common/auth/dtos/signUp.dto';

@Controller('users')
@ApiTags('Users Information')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'User created successfully',
    type: SignUpDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Please check the request payload.',
  })
  create(@Body() createUserDto: SignUpDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'List of users retrieved successfully',
    type: SignUpDto,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user by email' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    type: SignUpDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Please check the request payload.',
  })
  remove(@Body() email: string) {
    return this.userService.remove(email);
  }
}
