import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator'

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  booksRead?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  wantsToRead?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  currentlyReading?: string[]
}
