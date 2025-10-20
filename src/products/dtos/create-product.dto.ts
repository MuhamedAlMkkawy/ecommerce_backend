import { ValidateNested } from "class-validator";
import { DeepPartial } from "typeorm";

export class CreateProductDto {
  @ValidateNested({ each: true })
  products: DeepPartial<ProductsEntityProduct>[];

}

export interface ProductsEntityProduct {
  id: number;
  images : string[],
  title: string;
  text: string;
  rating: number;
  sizes: string[];
  isAvailable: boolean;
  hasDiscount: boolean;
  discount: number;
  price: number;
  priceAfterDiscount: number;
}

