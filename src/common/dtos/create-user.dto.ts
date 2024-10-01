import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsEmail()
    email: string;

    // @IsString()
    // @IsOptional()
    // roles: string;
  }
  