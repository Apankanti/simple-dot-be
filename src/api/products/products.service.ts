import { Product } from 'src/models/products/products.model';
import { AddProductDTO } from './dto/create.produtcs.dto';
import { ProductRepository } from 'src/repository/products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly userRepository: ProductRepository) {}

  async createProduct(addProductDTO: AddProductDTO): Promise<Product> {
    return this.userRepository.addProducts(addProductDTO);
  }
}
