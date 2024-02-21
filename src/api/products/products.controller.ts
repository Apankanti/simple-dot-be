import { Body, Controller, Post } from '@nestjs/common';
import { AddProductDTO } from './dto/create.produtcs.dto';
import { ProductService } from './products.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() addProductDTO: AddProductDTO) {
    return this.productService.createProduct(addProductDTO);
  }
}
