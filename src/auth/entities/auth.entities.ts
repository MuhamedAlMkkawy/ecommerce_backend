import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthEntity{
  @PrimaryGeneratedColumn()
  id : number


  @Column()
  image : string

  @Column()
  name : string


  @Column()
  email : string

  @Exclude()
  @Column()
  password : string


  @Exclude()
  @Column()
  confirmPassword : string
}