import { CartEntity } from 'src/cart/entities/cart.entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  images: string[];

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'float' })
  rating: number;

  @Column('simple-array')
  sizes: string[];

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({ type: 'boolean', default: false })
  hasDiscount: boolean;

  @Column({ type: 'float', default: 0 })
  discount: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float', nullable: true })
  priceAfterDiscount: number;

  // Many to One relationship with Cart
  @ManyToOne(() => CartEntity, cart => cart.products)
  carts: CartEntity;
}