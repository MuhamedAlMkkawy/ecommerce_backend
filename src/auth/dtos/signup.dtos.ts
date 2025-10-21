import { Exclude } from "class-transformer";
import { IsString } from "class-validator";

export class SignupDto {
  @IsString()
  image: string;
  
  @IsString()
  name: string;
  
  @IsString()
  email: string;
  
  @IsString()
  @Exclude()
  password: string;
  
  @IsString()
  @Exclude()
  confirmPassword: string;
}
