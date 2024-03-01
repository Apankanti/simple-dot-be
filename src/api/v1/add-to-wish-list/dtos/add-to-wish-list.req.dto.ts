import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddToWishListReqDto {
  @ApiProperty({
    description: 'ID of the product to be added to the wishlist',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'ID of the user adding the product to the wishlist',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
