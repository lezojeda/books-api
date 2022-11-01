import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

enum ReadState {
  read,
  currentlyReading,
  wantsToRead,
}

export class BookDto {
  @IsString()
  bookId: string

  @IsEnum(ReadState)
  readState: ReadState

  @IsNumber()
  userId: number

  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  publishedDate: string

  @IsString()
  @IsOptional()
  firstAuthor: string
}
