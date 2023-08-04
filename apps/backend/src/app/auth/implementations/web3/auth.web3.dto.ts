import { ApiProperty, } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength, } from 'class-validator';


export class SignatureDto {
  @ApiProperty()
  @IsString()
    signature: string;
}
