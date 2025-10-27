import { IsString, Matches, Min } from "class-validator";

export class LoginDto {
  @IsString()
  email : string



  @IsString()
  password : string
}