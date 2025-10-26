import { Exclude } from 'class-transformer';
import { CartEntity } from '../../cart/entities/cart.entities';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  token: string;

  @Column()
  password: string;

  @OneToOne(() => CartEntity, (cart) => cart.user, { cascade: true })
  cart: CartEntity[]; 
}