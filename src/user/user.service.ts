import { ForbiddenException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { BaseService } from 'src/base.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { EditUserDto } from './dto/editUserDto'

@Injectable()
export class UserService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async getMe(user: User) {
    if (await this.checkUserExists(user.email)) {
      const books = await this.prisma.book.findMany({
        where: {
          userId: user.id,
        },
      })

      return {
        books,
        ...user,
      }
    } else {
      throw new ForbiddenException('Data incorrect')
    }
  }

  async updateUser(email: string, dto: EditUserDto) {
    if (await this.checkUserExists(email)) {
      try {
        const updatedUser = await this.prisma.user.update({
          where: {
            email,
          },
          data: {
            ...dto,
          },
        })
        delete updatedUser.hash
        return updatedUser
      } catch (error) {
        /**
         * P2002 = Unique constraint failed (trying to use an already in-use email)
         */
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          throw new ForbiddenException('Credentials taken')
        }
      }
    } else {
      throw new ForbiddenException('Data incorrect')
    }
  }

  async deleteUser(id: number) {
    try {
      const deleteBooks = this.prisma.book.deleteMany({
        where: {
          userId: id,
        },
      })
      const deleteUser = this.prisma.user.delete({
        where: {
          id,
        },
      })

      await this.prisma.$transaction([deleteBooks, deleteUser])
    } catch (error) {
      throw error
    }
  }
}
