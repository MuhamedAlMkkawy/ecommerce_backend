import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested, Min, ValidateIf } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {

  @IsArray()
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
  sizes: string[];
  
  @Type(() => Boolean)
  @IsBoolean()
  isAvailable: boolean;
  
  @Type(() => Boolean)
  @IsBoolean()
  hasDiscount: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  discount: number;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsNumber()
  @ValidateIf((o) => o.priceAfterDiscount !== undefined)
  @Min(0)
  priceAfterDiscount: number;
}

