import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from 'src/common/auth/dtos/signUp.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: SignUpDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/users')
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete('/delete')
  remove(@Body() email: string) {
    return this.userService.remove(email);
  }
}
