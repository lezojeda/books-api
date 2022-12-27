import { User } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { BaseService } from 'src/base.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { BookDto } from './dto/BookDto'

@Injectable()
export class BookService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async upsertBook(user: User, book: BookDto) {
    await this.prisma.book.upsert({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: book.bookId,
        },
      },
      update: {
        readState: book.readState.toString(),
      },
      create: {
        bookId: book.bookId,
        readState: book.readState.toString(),
        userId: user.id,
        title: book.title,
        firstAuthor: book.firstAuthor,
        publishedDate: book.publishedDate,
      },
    })
  }
}
