import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { GetUserFromRequest } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'
import { EditUserDto } from './dto/editUserDto'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUserFromRequest() user: User) {
    return user
  }

  @Put(':id')
  updateUser(
    @GetUserFromRequest('email') userEmail: string,
    @Body() dto: EditUserDto
  ) {
    return this.userService.updateUser(userEmail)
  }
}
