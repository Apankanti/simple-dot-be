import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserReqDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class CreateUserResponseDto {
  success!: boolean;
}
