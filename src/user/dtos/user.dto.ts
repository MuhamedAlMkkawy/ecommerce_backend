import { Expose } from "class-transformer";

export class UserResponceDto{

  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  image: string;

  @Expose()
  email: string;

  // Password is NOT exposed, so it won't be in response
}