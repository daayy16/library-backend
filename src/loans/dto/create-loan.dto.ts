import { IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLoanDto {
    @IsNotEmpty()
    @IsString()
    userEmail: string;

    @IsNotEmpty()
    @IsNumber()
    bookId: number;
}
