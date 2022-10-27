import { IsEnum, IsNumber, IsString } from 'class-validator'

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
}
