import { Product } from 'src/models/products/products.model';
import { AddProductDTO } from './dtos/create-produtcs.dto';
import { ProductRepository } from 'src/repository/products.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(addProductDTO: AddProductDTO): Promise<Product> {
    return this.productRepository.addProducts(addProductDTO);
  }

  async createProductInBulk(
    addProductDTOs: AddProductDTO[],
  ): Promise<Product[]> {
    console.log('Received DTOs:', addProductDTOs);
    return this.productRepository.addMultipleProducts(addProductDTOs);
  }

  async findById(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
