import { IsString } from 'class-validator';

export class SizeDTO {
  @IsString()
  Width: string;

  @IsString()
  Length: string;
}
