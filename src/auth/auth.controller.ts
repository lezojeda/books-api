import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto, GoogleAuthDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto)
  }

  @Post('signup/google')
  async googleSignup(@Body() dto: GoogleAuthDto) {
    if (!(await this.authService.checkUserExists(dto.email)))
      return this.authService.signup(dto)
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto)
  }
}
