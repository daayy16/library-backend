import { IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";
import { User } from "src/typeorm";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    pathBookSaved: string;

    @IsNotEmpty()
    @IsString()
    userEmail: string;
}
