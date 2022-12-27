import { User } from '@prisma/client'
import { PrismaService } from './prisma/prisma.service'

export class BaseService {
  constructor(public prisma: PrismaService) {}

  async getUser(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        books: true,
      },
    })
  }
}
