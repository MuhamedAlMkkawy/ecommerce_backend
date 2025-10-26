import { Exclude } from 'class-transformer';
import { CartEntity } from '../../cart/entities/cart.entities';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image?: string;
  
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  token: string;

  @Column()
  password: string;

  @Column({nullable : true})
  confirmPassword : string

  @OneToOne(() => CartEntity, (cart) => cart.user, { cascade: true })
  cart: CartEntity[]; 
}