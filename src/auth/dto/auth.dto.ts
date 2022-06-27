import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'E-mail should not be empty' })
  @IsEmail({}, { message: 'The e-mail has an incorrect format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password must have a minimum of 8 characters' })
  password: string;
}

export class GoogleAuthDto {
  @IsNotEmpty({ message: 'E-mail should not be empty' })
  @IsEmail({}, { message: 'The e-mail has an incorrect format' })
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
