import { IsDate, IsOptional } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(OmitType(UserDto, ['email', 'password', 'confirmPassword'] as const)) {
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
