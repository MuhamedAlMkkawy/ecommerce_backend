import { ProductsEntity } from "src/products/entities/products.entities";
import { UserEntity } from "src/user/entities/user.entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, user => user.cart)
  @JoinColumn()
  user: UserEntity;


  @OneToMany(() => ProductsEntity, product => product.carts)
  @JoinColumn()
  products: ProductsEntity[];
}