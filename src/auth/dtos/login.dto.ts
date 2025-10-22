import { IsEmail, IsString, Matches } from "class-validator";

export class LoginDto {
  @IsEmail()
  email : string



  @IsString()
  @Matches(/^\d+|\D+\d*/)

  password : string
}