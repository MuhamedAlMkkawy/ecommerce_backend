import { ProductsEntity } from "src/products/entities/products.entities";
import { ProductsService } from "src/products/products.service";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => , user => user.cartItems)
  // user: User;

  @ManyToOne(() => ProductsEntity)
  product: ProductsEntity;

  @Column({ default: 1 })
  quantity: number;

  // Optional snapshot fields
  @Column({ type: 'float', nullable: true })
  priceAtAdd?: number;

  @Column({ nullable: true })
  titleSnapshot?: string;
}
