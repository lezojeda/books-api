import { Body, Controller, Put, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { JwtGuard } from 'src/auth/guard'
import { GetUserFromRequest } from 'src/decorators'
import { BookService } from './book.service'
import { BookDto } from './dto/BookDto'

@UseGuards(JwtGuard)
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Put()
  upsert(@GetUserFromRequest() user: User, @Body() dto: BookDto) {
    return this.bookService.upsertBook(user, dto)
  }
}
