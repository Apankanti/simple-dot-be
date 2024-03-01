import { ApiProperty } from '@nestjs/swagger';

export class AddToWishListResDto {
  @ApiProperty({
    description: 'ID of the product in the wishlist',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  productId: string;

  @ApiProperty({
    description: 'ID of the user in the wishlist',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  userId: string;

  @ApiProperty({
    description: 'Timestamp when the product was added to the wishlist',
    type: Date,
    example: '2024-02-28T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp of the last update to the wishlist entry',
    type: Date,
    example: '2024-02-28T12:34:56.789Z',
  })
  updatedAt?: Date;
}
