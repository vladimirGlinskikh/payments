import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import type { User } from '@prisma/client'
import type { Request } from 'express'

import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(AuthGuard('jwt'))
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
	getMe(@Req() req: Request): User {
		return req.user!
	}
}
