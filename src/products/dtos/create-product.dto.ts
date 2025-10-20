import { 
  IsArray, 
  IsBoolean, 
  IsNumber, 
  IsString, 
  Min, 
  ValidateIf 
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim() === '' ? [] : value.split(',').map(v => v.trim());
    }
    return Array.isArray(value) ? value : [];
  })
  images: string[];

  @IsString()
  title: string;

  @IsString()
  text: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  rating: number;

  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim() === '' ? [] : value.split(',').map(v => v.trim());
    }
    return Array.isArray(value) ? value : [];
  })
  sizes: string[];

  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return false;
  })
  @IsBoolean()
  isAvailable: boolean;

  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return false;
  })
  @IsBoolean()
  hasDiscount: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  discount: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @Type(() => Number)
  @ValidateIf(o => o.priceAfterDiscount !== undefined && o.priceAfterDiscount !== '')
  @IsNumber()
  @Min(0)
  priceAfterDiscount: number;
}
