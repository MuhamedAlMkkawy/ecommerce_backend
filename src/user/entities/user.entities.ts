import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id : number

  @Column()
  name : string

  @Column()
  image : string

  @Column({ unique: true }) // Add unique constraint
  email: string;

  @Column({ type: 'text', nullable: true }) // Make token nullable and text type
  token: string;


  @Column()
  password : string

  
}

