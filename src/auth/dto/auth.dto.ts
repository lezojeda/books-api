import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class AuthDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'The e-mail has an incorrect format' })
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @IsOptional()
  @IsString()
  @MaxLength(30)
  firstName: string

  @IsOptional()
  @IsString()
  @MaxLength(30)
  lastName: string
}

export class GoogleAuthDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'The e-mail has an incorrect format' })
  email: string

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string
}
