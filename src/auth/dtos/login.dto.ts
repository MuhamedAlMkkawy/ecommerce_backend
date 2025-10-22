import { IsString, Matches } from "class-validator";

export class LoginDto {
  @IsString()
  email : string



  @IsString()
  @Matches(/^\d+|\D+\d*/)
  password : string
}