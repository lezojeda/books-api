import { ForbiddenException, Injectable } from '@nestjs/common'
import { AuthDto, GoogleAuthDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

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
          booksRead: [],
          wantsToRead: [],
          currentlyReading: [],
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
    const user = await this.checkUserExists(dto.email)

    if (!user) throw new ForbiddenException('Credentials incorrect')

    const pwMatches = await argon.verify(user.hash, dto.password)

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect')

    return this.signToken(user.id, user.email)
  }

  async signToken(
    userId: number,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    }

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: this.config.get('JWT_SECRET'),
    })

    return {
      access_token,
    }
  }

  async checkUserExists(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
