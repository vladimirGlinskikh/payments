import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { User } from '@prisma/client'

export const Authorized = createParamDecorator(
	<K extends keyof User>(
		data: K | undefined,
		ctx: ExecutionContext
	): K extends undefined ? User : User[K] => {
		const request = ctx.switchToHttp().getRequest<{
			user: User
		}>()

		const user = request.user

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return (data ? user[data] : user) as any
	}
)
