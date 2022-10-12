import { PrismaService } from './prisma/prisma.service'

export class BaseService {
  constructor(public prisma: PrismaService) {}

  async checkUserExists(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
