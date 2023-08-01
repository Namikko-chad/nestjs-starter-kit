import { ApiProperty, } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength, } from 'class-validator';


export class SignUpDto {
  @ApiProperty()
  @IsEmail()
    email: string;

  @ApiProperty()
  @IsString()
  @Matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}/)
    password: string;
}

export class SignUpResendDto {
  @ApiProperty()
  @IsEmail()
    email: string;
}

export class SignUpConfirmDto {
  @ApiProperty()
  @IsEmail()
    email: string;
  
  @ApiProperty()
  @IsString()
  @Matches(/[0-9a-zA-Z]{12,12}/)
    token: string;
}

export class SignInDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
    login: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
    password: string;
}

export class PasswordRecoveryDto {
  @ApiProperty()
  @IsEmail()
    email: string;
}

export class PasswordRecoveryConfirmDto {
  @ApiProperty()
  @IsEmail()
    email: string;

  @ApiProperty()
  @IsString()
  @Matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}/)
    password: string;

  @ApiProperty()
  @IsString()
  @Matches(/[0-9a-zA-Z]{12,12}/)
    token: string;
}