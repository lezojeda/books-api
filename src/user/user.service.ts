import { ForbiddenException, Injectable } from '@nestjs/common'
import { BaseService } from 'src/base.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async updateUser(userEmail: string) {
    if (await this.checkUserExists(userEmail)) {
      // update
    } else {
      throw new ForbiddenException('Data incorrect')
    }
  }
}
