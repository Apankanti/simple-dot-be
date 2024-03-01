import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AddToWishListReqDto } from './dtos/add-to-wish-list.req.dto';
import { AddToWishListService } from './add-to-wish-list.service';
import { JWTAuthGuard } from 'src/common/guards';
import { SWAGGER } from 'src/common/constants/swagger-schema';

@ApiTags('Wishlist')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth(SWAGGER.SCHEME.IDENTIFIER)
@Controller('wishlist')
export class AddToWishListController {
  constructor(private readonly wishListService: AddToWishListService) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Product added to wishlist successfully' })
  @ApiBadRequestResponse({ description: 'Bad request or validation error' })
  @ApiConflictResponse({
    description: 'Product already exists in the wishlist',
  })
  addToWishList(@Body() addToWishListDto: AddToWishListReqDto): Promise<void> {
    return this.wishListService.addToWishList(addToWishListDto);
  }

  @Get('/:userId')
  @ApiOkResponse({
    description: 'Successfully retrieved wishlist entries',
    type: [AddToWishListReqDto],
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  getWishListByUserId(
    @Param('userId') userId: string,
  ): Promise<AddToWishListReqDto[]> {
    return this.wishListService.getWishListByUserId(userId);
  }

  @Delete('remove/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Product removed from wishlist successfully',
  })
  @ApiNotFoundResponse({ description: 'Product not found in the wishlist' })
  removeFromWishList(@Param('productId') productId: string): Promise<void> {
    return this.wishListService.removeFromWishList(productId);
  }
}
