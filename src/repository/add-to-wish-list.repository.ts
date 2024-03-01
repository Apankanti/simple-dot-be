import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { WhishList, WishListBase } from 'src/models/wish-list';

@Injectable()
export class WishListRepository {
  constructor(
    @InjectModel(WhishList)
    private readonly wishListModel: typeof WhishList,
  ) {}

  async addToWishList(
    productId: string,
    userId: string,
    transaction?: Transaction,
  ): Promise<WhishList> {
    return this.wishListModel.create({ productId, userId }, { transaction });
  }

  async removeFromWishList(productId: string, userId: string): Promise<void> {
    const result = await this.wishListModel.destroy({
      where: { productId, userId },
    });
    if (result === 0) {
      throw new NotFoundException('Wishlist entry not found');
    }
  }

  async getWishListByUserId(userId: string): Promise<WishListBase[]> {
    return this.wishListModel.findAll({ where: { userId } });
  }
}
