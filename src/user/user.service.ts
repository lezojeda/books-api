import { ForbiddenException, Injectable } from '@nestjs/common'
import { BaseService } from 'src/base.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { EditUserDto } from './dto/editUserDto'

@Injectable()
export class UserService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async updateUser(email: string, dto: EditUserDto) {
    console.log(dto)
    if (await this.checkUserExists(email)) {
      const updatedUser = await this.prisma.user.update({
        where:{
          email,
        },
        data: {
          ...dto
        }
      })

      return updatedUser
    } else {
      throw new ForbiddenException('Data incorrect')
    }
  }
}
