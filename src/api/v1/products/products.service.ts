import { Product } from 'src/models/products/products.model';
import { AddProductDTO } from './dtos/create-produtcs.dto';
import { ProductRepository } from 'src/repository/products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(addProductDTO: AddProductDTO): Promise<Product> {
    console.log('Received DTO:', addProductDTO);

    // Add additional logging if needed

    return this.productRepository.addProducts(addProductDTO);
  }
  async createProductInBulk(
    addProductDTOs: AddProductDTO[],
  ): Promise<Product[]> {
    console.log('Received DTOs:', addProductDTOs);

    // Add additional logging if needed

    return this.productRepository.addMultipleProducts(addProductDTOs);
  }
}
