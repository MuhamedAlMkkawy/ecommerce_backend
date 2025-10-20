import { IsArray, IsString, IsBoolean , IsNumber , ValidateNested, Min } from "class-validator";
import { Type } from "class-transformer";
import { DeepPartial } from "typeorm";

class AboutUsDto {
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString({ message: 'Text must be a string' })
  text: string;

  @IsString({ message: 'Image must be a string' })
  image: string;
}


class ProductsDto {
  @IsNumber()
  id : number

  @IsArray({ message: 'Images must be an array' })
  @IsString({ each: true, message: 'Each image must be a string' })
  images: string[];
  
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString({ message: 'Text must be a string' })
  text: string;

  @IsNumber({}, { message: 'Rating must be a number' })
  rating: number;

  @IsString({ message: 'Sizes must be a string' })
  sizes: string;

  @IsBoolean({ message: 'IsAvailable must be a boolean' })
  isAvailable: boolean;

  @IsBoolean({ message: 'HasDiscount must be a boolean' })
  hasDiscount: boolean;

  @IsNumber({}, { message: 'Discount must be a number' })
  discount: number;

  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @IsNumber({}, { message: 'PriceAfterDiscount must be a number' })
  priceAfterDiscount: number;
}

export class HomeDto {
  @IsArray({ message: 'Images must be an array' })
  @IsString({ each: true, message: 'Each image must be a string' })
  images: string[];

  @ValidateNested()
  @Type(() => AboutUsDto)
  aboutus: AboutUsDto;

  @IsArray({ message: 'Products must be an array' })
  @ValidateNested({ each: true })
  @Type(() => ProductsDto)
  products: DeepPartial<ProductsDto>[];
}
