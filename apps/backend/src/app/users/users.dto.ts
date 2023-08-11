import { ApiProperty, } from '@nestjs/swagger';

export class UsersUpdateDto {

  @ApiProperty({
    required: false,
    maxLength: 255,
    })
    username?: string;

  @ApiProperty({
    required: false,
    })
    avatar?: string;
}