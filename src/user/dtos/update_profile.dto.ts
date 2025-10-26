import { IsString } from "class-validator";


export class UpdateProfileDto {

  @IsString()
  image?: string;

  @IsString()
  name?: string;

  @IsString()
  email?: string;

  @IsString()
  password? : string;
}