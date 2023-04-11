import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupDto, GoogleAuthDto, SigninDto } from './dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto)
  }

  @Post('google')
  async googleAuth(@Body() dto: GoogleAuthDto, @Res() res: Response) {
    const user = await this.authService.getUser(dto.email)
    if (!user) {
      const newUser = this.authService.signup(dto)
      return res.status(HttpStatus.CREATED).json(newUser)
    }
    const token = await this.authService.googleSignin(user)
    return res.status(HttpStatus.OK).json(token)
  }

  @Post('signin')
  @HttpCode(200)
  signin(@Body() dto: SigninDto): Promise<{ access_token: string }> {
    return this.authService.signin(dto)
  }
}
