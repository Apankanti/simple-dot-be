import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddProductDTO } from 'src/api/products/dto/create.produtcs.dto';
import { Product } from 'src/models/products/products.model';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async addProducts(addProductDto: AddProductDTO): Promise<Product> {
    const { descriptionFit, ...rest } = addProductDto;
    const size: any = {};
    for (const key in descriptionFit.size) {
      size[key] = descriptionFit.size[key];
    }
    const transformedDto = {
      ...rest,
      descriptionFit: {
        ...descriptionFit,
        size,
      },
    };
    return this.productModel.create(transformedDto);
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findByPk(id);
  }
}
