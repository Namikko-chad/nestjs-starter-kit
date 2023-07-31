import { ApiProperty, } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, } from 'class-validator';

export enum Token {
  Access = 'access',
  Refresh = 'refresh',
}

export class AuthParamsDTO {
  @ApiProperty({
    required: true,
    enum: Token,
    })
  @IsEnum(Token)
    tokenType!: Token;
}

export class AuthBodyDTO {
  @ApiProperty({
    required: false,
    })
  @IsString()
    userId!: string;

  @ApiProperty({
    required: false,
    })
  @IsString()
  @IsOptional()
    fileId?: string;
}
