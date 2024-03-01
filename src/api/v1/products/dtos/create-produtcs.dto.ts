import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDecimal,
  ValidateNested,
  IsUrl,
  ArrayMinSize,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SizeDto {
  @ApiProperty({
    description: 'The width of the size',
    example: '30cm',
  })
  @IsString()
  width: string;

  @ApiProperty({
    description: 'The length of the size',
    example: '40cm',
  })
  @IsString()
  length: string;
}

export class SizeDto1 {
  @ApiProperty({
    description: 'Size details for XS',
    type: SizeDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SizeDto)
  XS?: SizeDto;

  @ApiProperty({
    description: 'Size details for S',
    type: SizeDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SizeDto)
  S?: SizeDto;

  @ApiProperty({
    description: 'Size details for M',
    type: SizeDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SizeDto)
  M?: SizeDto;

  @ApiProperty({
    description: 'Size details for L',
    type: SizeDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SizeDto)
  L?: SizeDto;

  @ApiProperty({
    description: 'Size details for XL',
    type: SizeDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SizeDto)
  XL?: SizeDto;

  @ApiProperty({
    description: 'Size details for XXL',
    type: SizeDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SizeDto)
  XXL?: SizeDto;
}

export class DescriptionFitDto {
  @ApiProperty({
    description: 'The description of the fit',
    example: 'Slim Fit',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Size details for the fit',
    type: SizeDto1,
  })
  @IsObject()
  size?: SizeDto1;

  @ApiProperty({
    description: 'The sleeve length of the fit',
    example: 'Short Sleeve',
  })
  @IsString()
  sleeveLength: string;

  @ApiProperty({
    description: 'The fit type',
    example: 'Regular',
  })
  @IsString()
  fit: string;

  @ApiProperty({
    description: 'The neckline type',
    example: 'Crew Neck',
  })
  @IsString()
  neckline: string;
}
export class AddProductDTO {
  @ApiProperty({
    description: 'The ID of the product',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'The type of the product',
    example: 'Laptop',
  })
  @IsString()
  @IsNotEmpty()
  productType: string;

  @ApiProperty({
    description: 'The title of the product',
    example: 'High-Performance Laptop',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The fit description of the product',
    type: () => DescriptionFitDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DescriptionFitDto)
  descriptionFit: DescriptionFitDto;

  @ApiProperty({
    description: 'The color of the product',
    example: 'Silver',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    description: 'The array of image URLs for the product',
    type: String,
    isArray: true,
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one image is required' })
  @IsString({ each: true })
  @IsUrl({}, { each: true, message: 'Invalid image URL format' })
  @IsNotEmpty({ each: true })
  images: string[];

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  price: number;
}
