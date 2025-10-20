import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HomeEnitiy {
  @PrimaryGeneratedColumn()
  id : string

  @Column("text", { array: true })
  images : string[];

  @Column("json")
  aboutus : {
    title : string,
    text : string,
    image : string
  }

  @Column("json", { array: true })
  products : Array<{
    id:number,
    title : string,
    text : string,
    rating : number,
    sizes : string,
    isAvailable : boolean,
    hasDiscount : boolean,
    discount : number,
    price : number,
    priceAfterDiscount : number
  }>
}

