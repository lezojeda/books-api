import { ForbiddenException, Injectable } from '@nestjs/common'
import { AuthDto, GoogleAuthDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { BaseService } from 'src/base.service'
import { Book, User } from '@prisma/client'

@Injectable({})
export class AuthService extends BaseService {
  constructor(
    prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {
    super(prisma)
  }

  async signup(dto: AuthDto | GoogleAuthDto) {
    let hash: string
    let firstName: string
    let lastName: string

    if ('password' in dto) hash = await argon.hash(dto.password)
    if ('firstName' in dto) firstName = dto.firstName
    if ('lastName' in dto) lastName = dto.lastName
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName,
          lastName,
        },
      })
      delete user.hash

      return user
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

      throw error
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.getUser(dto.email)

    if (!user) throw new ForbiddenException('Credentials incorrect')

    const pwMatches = await argon.verify(user.hash, dto.password)

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect')

    const books = await this.prisma.book.findMany({
      where: {
        userId: user.id,
      },
    })

    return this.signToken(user, books)
  }

  async signToken(
    user: User,
    books: Book[]
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      id: user.id,
      books,
    }

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: this.config.get('JWT_SECRET'),
    })

    return {
      access_token,
    }
  }
}
