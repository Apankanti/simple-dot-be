import { Body, Controller, Post } from '@nestjs/common';
import { AddProductDTO } from './dtos/create-produtcs.dto';
import { ProductService } from './products.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add-produt')
  create(@Body() addProductDTO: AddProductDTO) {
    return this.productService.createProduct(addProductDTO);
  }
  @Post('/bulk')
  createInBulk(@Body() addProductDTOs: AddProductDTO[]) {
    return this.productService.createProductInBulk(addProductDTOs);
  }
}
