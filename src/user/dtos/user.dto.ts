import { Expose } from "class-transformer";

export class UserResponceDto{

  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  token : string

  @Expose()
  image: string;

  @Expose()
  email: string;

}
