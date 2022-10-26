import { Book } from './editUserDto'
import { User } from '@prisma/client'

export class UserDto implements User {
  id: number
  createdAt: Date
  updatedAt: Date
  email: string
  hash: string | null
  firstName: string | null
  lastName: string | null
  books?: Book[]
}
