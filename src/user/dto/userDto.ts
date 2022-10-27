import { User } from '@prisma/client'
import { BookDto } from 'src/book/dto/BookDto'

export class UserDto implements User {
  id: number
  createdAt: Date
  updatedAt: Date
  email: string
  hash: string | null
  firstName: string | null
  lastName: string | null
  books?: BookDto[]
}
