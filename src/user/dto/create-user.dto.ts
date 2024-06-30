import { IsDate, IsOptional } from 'class-validator';
import { UserDto } from '.';

export class CreateUserDto extends UserDto {
  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
