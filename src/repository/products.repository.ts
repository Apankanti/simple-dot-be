import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductParams } from 'src/models/products';
import { Product } from 'src/models/products/products.model';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async addProducts(addProduct: CreateProductParams): Promise<Product> {
    return this.productModel.create(addProduct);
  }

  async addMultipleProducts(
    products: CreateProductParams[],
  ): Promise<Product[]> {
    try {
      const createdProducts = await this.productModel.bulkCreate(products, {
        returning: true,
      });
      return createdProducts as Product[];
    } catch (error) {
      console.error('Sequelize Validation Error:', error.errors);
      throw error;
    }
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findByPk(id);
  }
}
