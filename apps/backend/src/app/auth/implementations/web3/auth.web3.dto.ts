import { ApiProperty, } from '@nestjs/swagger';
import { IsString, } from 'class-validator';

export class SignatureDto {
  @ApiProperty()
  @IsString()
    signature: string;
}
