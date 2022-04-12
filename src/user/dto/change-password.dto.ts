import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    username : string;

    @IsNotEmpty()
    oldPassword : string;

    @IsNotEmpty()
    newPassword : string;
}