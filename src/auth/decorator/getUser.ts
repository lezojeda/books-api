import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUserFromRequest = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest()
    console.log(request)
    if (data) {
      return request.user[data]
    }
    return request.user
  }
)
