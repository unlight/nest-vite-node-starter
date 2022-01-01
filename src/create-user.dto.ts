import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    readonly email!: string;

    @IsString()
    @Length(6, 32)
    readonly password!: string;
}
