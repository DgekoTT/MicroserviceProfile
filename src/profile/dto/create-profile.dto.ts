import {IsNumber, IsString} from "class-validator";

export class CreateProfileDto {
    @IsString({message: " Должно быть строкой"})
    readonly fullName: string;
    @IsNumber({}, {message: 'Только числа'})
    readonly phone: number;
    @IsNumber({}, {message: 'Только числа'})
    readonly age: number;
    @IsString({message: " Должно быть строкой"})
    readonly city: string;
    @IsString({message: " Должно быть строкой"})
    userId: number;
}