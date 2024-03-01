import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  emailVerified!: boolean;

  @ApiProperty()
  token!: string;

  @ApiProperty()
  refreshToken!: string;
}
