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
import { SizeDTO } from './addSize.dto';

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
  @Type(() => SizeDTO)
  descriptionFit: {
    description: string;
    size: SizeDTO;
    sleevelength: string;
    fit: string;
    neckline: string;
  };

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
