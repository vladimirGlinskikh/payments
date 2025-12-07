import { Body, Controller, Post, Res } from '@nestjs/common'
import type { Response } from 'express'

import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto'

@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post('register')
	public async register(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: RegisterDto
	) {
		return this.authService.register(res, dto)
	}

	@Post('login')
	public async login(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: LoginDto
	) {
		return this.authService.login(res, dto)
	}

	@Post('logout')
	public logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}
}
