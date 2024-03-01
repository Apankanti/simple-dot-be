import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductService } from '../products/products.service';
import { WhishList } from 'src/models';
import { UserService } from '../user/user.service';
import { AddToWishListReqDto } from './dtos/add-to-wish-list.req.dto';
import { AddToWishListResDto } from './dtos/add-to-wish-list.res.dto';

@Injectable()
export class AddToWishListService {
  constructor(
    @InjectModel(WhishList)
    private readonly wishListModel: typeof WhishList,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async addToWishList(addToWishListDto: AddToWishListReqDto): Promise<void> {
    const { productId, userId } = addToWishListDto;
    const isProductAlreadyAdded = await this.wishListModel.findOne({
      where: {
        productId,
        userId,
      },
    });
    if (isProductAlreadyAdded) {
      throw new ConflictException('Product already exists in the wishlist');
    }
    const product = await this.productService.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.wishListModel.create({ productId, userId });
  }

  async getWishListByUserId(userId: string): Promise<AddToWishListResDto[]> {
    const wishListEntries = await this.wishListModel.findAll({
      where: { userId },
    });
    return wishListEntries.map((entry) => ({
      productId: entry.productId,
      userId: entry.userId,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    }));
  }

  async removeFromWishList(productId: string): Promise<void> {
    await this.wishListModel.destroy({
      where: {
        productId,
      },
    });
  }
}
