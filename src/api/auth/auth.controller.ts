import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { Request, Response } from 'express'

import { AuthService } from './auth.service'
import { LoginRequest, RegisterDto } from './dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post('register')
	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({ status: 201, description: 'Успешная регистрация' })
	public async register(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: RegisterDto
	) {
		return this.authService.register(res, dto)
	}

	@Post('login')
	@ApiOperation({ summary: 'Вход в систему' })
	@ApiResponse({ status: 200, description: 'Успешный логин' })
	public async login(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: LoginRequest
	) {
		return this.authService.login(res, dto)
	}

	@Post('refresh')
	@ApiOperation({ summary: 'Обновление access-токена' })
	public async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.refresh(req, res)
	}

	@Post('logout')
	@ApiOperation({ summary: 'Выход из системы' })
	public logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}
}
