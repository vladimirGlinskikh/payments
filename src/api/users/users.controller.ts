import { Controller, Get } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import * as client from '@prisma/client'

import { Authorized } from '../../common/decorators'
import { Protected } from '../../common/decorators/protected.decorator'

import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Protected()
	@Get('me')
	@ApiBearerAuth('JWT-auth')
	@ApiOperation({
		summary: 'Получить текущего пользователя',
		description: 'Возвращает данные авторизованного пользователя'
	})
	@ApiResponse({
		status: 200,
		description: 'Успешно'
	})
	@ApiResponse({ status: 401, description: 'Не авторизован' })
	getMe(@Authorized() user: client.User) {
		return user
	}
}
