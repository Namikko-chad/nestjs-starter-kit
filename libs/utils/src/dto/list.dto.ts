import { ApiProperty, } from '@nestjs/swagger';
import { Type, } from 'class-transformer';
import { IsDate, IsInt, IsObject, IsOptional, IsString, Min, Validate, ValidatorConstraint, ValidatorConstraintInterface, } from 'class-validator';
import { FindOptionsOrder, } from 'typeorm';

@ValidatorConstraint()
class OrderDirection implements ValidatorConstraintInterface {
  private accepted = ['ASC', 'DESC', 'asc', 'desc'];

  validate(req: Record<string, string>) {
    return !!!Object.values(req).filter((value) => !this.accepted.includes(value)).length;
  }

  defaultMessage(): string {
    return `order value must be ${this.accepted.join(', ')}`;
  }
}

// @ValidatorConstraint()
// export class OrderProperty<Entity> implements ValidatorConstraintInterface {
// 	constructor(private readonly entity: Entity) {}

// 	validate(req: Record<string, string>) {
// 		console.log(this.entity)
// 		console.log(req)
// 		return false
// 	}

// 	defaultMessage(): string {
// 		return 'order property does not exist';
// 	}
// }

export class ListDto<Entity> {
  @ApiProperty({
    required: false,
    default: 10,
    minimum: 1,
    })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
    limit = 10;

  @ApiProperty({
    required: false,
    default: 0,
    minimum: 0,
    })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
    offset = 0;

  @ApiProperty({
    required: false,
    })
  @IsString()
  @IsOptional()
    search?: string;

  @ApiProperty({
    required: false,
    })
  @IsObject()
  @IsOptional()
  @Validate(OrderDirection)
  // @Validate(OrderProperty<Entity>)
    order?: FindOptionsOrder<Entity>;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2020-06-15T10:30:50.000Z',
    })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
    from = new Date('0');

  @ApiProperty({
    required: false,
    type: Date,
    example: '2020-06-15T10:30:50.000Z',
    })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
    to = new Date(new Date().setUTCHours(23, 59, 59, 999));
}
