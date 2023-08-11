import { ApiProperty, } from '@nestjs/swagger';
import { Type, } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsString, } from 'class-validator';

import { UserRole, } from '../../../users/users.enum';


export class InviteDto {
  @ApiProperty()
  @IsString()
    invite: string;
}

export class InviteCreateDto {
  @ApiProperty()
  @IsEmail()
    email: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
    expiredAt: Date;

  @ApiProperty()
  @IsEnum(UserRole)
    role: UserRole;
}