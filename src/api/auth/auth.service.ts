import { ConflictException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash } from 'argon2'

import { PrismaService } from '../../infra/prisma/prisma.service'

import { RegisterDto } from './dto'
import { JwtPayload } from './interfaces'

@Injectable()
export class AuthService {
	private readonly JWT_ACCESS_TOKEN_TTL: string
	private readonly JWT_REFRESH_TOKEN_TTL: string

	public constructor(
		private readonly prismaservice: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService
	) {
		this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>(
			'JWT_ACCESS_TOKEN_TTL'
		)
		this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>(
			'JWT_REFRESH_TOKEN_TTL'
		)
	}

	public async register(dto: RegisterDto) {
		const { name, email, password } = dto

		const exists = await this.prismaservice.user.findUnique({
			where: {
				email
			}
		})
		if (exists) throw new ConflictException('User is already registered')
		const hashedPassword = await hash(password)
		const user = await this.prismaservice.user.create({
			data: {
				name,
				email,
				password: hashedPassword
			}
		})
		return this.generateTokens(user)
	}

	private async generateTokens(user: User) {
		const payload: JwtPayload = { id: user.id }

		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.JWT_ACCESS_TOKEN_TTL,
			secret: this.configService.getOrThrow<string>('JWT_SECRET')
		} as any)

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.JWT_REFRESH_TOKEN_TTL,
			secret: this.configService.getOrThrow<string>('REFRESH_SECRET')
		} as any)

		return { accessToken, refreshToken }
	}
}
