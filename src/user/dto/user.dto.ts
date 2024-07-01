import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { ValidRoles } from 'src/auth/interfaces';
import { Match } from 'src/common/decorators/match.decorator';

export class UserDto {
  @IsEmail()
  email: string;

  // @IsString()
  // @Length(8, 50)
  // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'The password must have a Uppercase, lowercase letter and a number',
  // })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'The password must have a Uppercase, lowercase letter, a special character, a number and min length 8',
    },
  )
  password: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'The confirmPassword must have a Uppercase, lowercase letter, a special character, a number and min length 8',
    },
  )
  @Match('password')
  confirmPassword?: string;

  @IsString()
  @Length(4, 50)
  firstName: string;

  @IsString()
  @Length(4, 50)
  lastName: string;

  @IsEnum(ValidRoles, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  roles?: ValidRoles[];
}
