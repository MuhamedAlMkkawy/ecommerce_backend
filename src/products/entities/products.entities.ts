import { ValidateNested } from "class-validator";
import { Entity, Column, DeepPartial } from "typeorm";

@Entity()
export class ProductsEntity{
  @Column("json")
  @ValidateNested({ each: true })
  products : DeepPartial<ProductsEntityProduct>[]
}

export interface ProductsEntityProduct{
  id : number,
  images : string[],
  title : string,
  text : string,
  rating : number,
  sizes : string[],
  isAvailable : boolean,
  hasDiscount : boolean,
  discount : number,
  price : number,
  priceAfterDiscount : number
}
