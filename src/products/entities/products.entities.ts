import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products') // optional: naming the table explicitly
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // ✅ simple-array stores comma-separated strings internally
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
}
