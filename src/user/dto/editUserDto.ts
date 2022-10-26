import { Type } from 'class-transformer'
import { IsArray, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator'

export class Book  {
  [bookId: string]: 'read' | 'currentlyReading' | 'wantsToRead'
}

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
  @ValidateNested({ each: true })
  @Type(() => Book)
  books?: Book[]
}
