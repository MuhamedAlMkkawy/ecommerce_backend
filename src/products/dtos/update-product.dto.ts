import {IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto{
  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsString()
  title?: string;
  
  @IsOptional()
  @IsString()
  text?: string;
  
  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsArray()
  sizes?: string[];

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  hasDiscount?: boolean;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  priceAfterDiscount?: number;
}