import { IsString } from "class-validator";

export class SignupDto {
  @IsString()
  image: string;
  
  @IsString()
  name: string;
  
  @IsString()
  email: string;
  
  @IsString()
  password: string;
  
  @IsString()
  confirmPassword: string;
}
