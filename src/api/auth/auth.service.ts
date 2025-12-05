import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '../../infra/prisma/prisma.service'

import { RegisterDto } from './dto'

@Injectable()
export class AuthService {
	public constructor(private readonly prismaservice: PrismaService) {}

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
		return user
	}
}
