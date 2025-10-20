import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested, Min, ValidateIf } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {

  @IsArray()
  // @ValidateNested()
  // @Type(() => String)
  images: string[];

  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsNumber()
  @Min(1)
  rating: number;

  @IsArray()
  // @ValidateNested()
  // @Type(() => String)
  sizes: string[];

  @IsBoolean()
  isAvailable: boolean;

  @IsBoolean()
  hasDiscount: boolean;

  @IsNumber()
  @Min(0)
  discount: number;

  @IsNumber()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsNumber()
  @ValidateIf((o) => o.priceAfterDiscount !== undefined)
  @Min(0)
  priceAfterDiscount: number;
}

