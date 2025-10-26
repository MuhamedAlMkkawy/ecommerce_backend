import { Expose, plainToClass, Transform } from "class-transformer";
import { ProductsEntity } from "src/products/entities/products.entities";

export class CartDto {
  @Expose()
  id : number

  @Expose()
  @Transform(({obj}) => obj.user.id)
  user_id : number

  @Expose()
  @Transform(({obj}) => obj.products)
  products : ProductsEntity[]
}