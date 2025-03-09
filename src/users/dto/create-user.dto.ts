import { IsDateString, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  cellphone: string;

  @IsString()
  @MinLength(8)
  password: string;

}
