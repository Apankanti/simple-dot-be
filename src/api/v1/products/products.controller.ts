import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { AddProductDTO } from './dtos/create-produtcs.dto';

@Controller('products')
@ApiTags('Products') // Swagger tag for grouping endpoints
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add-product')
  @ApiCreatedResponse({
    description: 'Product created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Please check the request payload.',
  })
  create(@Body() addProductDTO: AddProductDTO) {
    return this.productService.createProduct(addProductDTO);
  }

  @Post('/add-products/bulk')
  @ApiCreatedResponse({
    description: 'Products created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Please check the request payload.',
  })
  createInBulk(@Body() addProductDTOs: AddProductDTO[]) {
    return this.productService.createProductInBulk(addProductDTOs);
  }
}
