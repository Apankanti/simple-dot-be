import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDecimal,
  ValidateNested,
  IsUrl,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class SizeDto {
  @IsString()
  width: string;

  @IsString()
  length: string;
}

export class SizeDto1 {
  XS?: SizeDto;
  S?: SizeDto;
  M?: SizeDto;
  L?: SizeDto;
  XL?: SizeDto;
  XXL?: SizeDto;
}

class DescriptionFitDto {
  description: string;
  size?: SizeDto1;
  sleeveLength: string;
  fit: string;
  neckline: string;
}

export class AddProductDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  productType: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DescriptionFitDto)
  descriptionFit: DescriptionFitDto;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one image is required' })
  @IsString({ each: true })
  @IsUrl({}, { each: true, message: 'Invalid image URL format' })
  @IsNotEmpty({ each: true })
  images: string[];

  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  price: number;
}
