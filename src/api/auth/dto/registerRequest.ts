import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterRequest {
	@ApiProperty({
		example: 'Vladimir',
		description: 'Имя пользователя'
	})
	@IsString()
	public name: string

	@ApiProperty({
		example: 'Vladimir@gmai.com',
		description: 'Почтовый ящик пользователя'
	})
	@IsNotEmpty()
	@IsEmail()
	public email: string

	@ApiProperty({
		example: 'somePasswordStrong',
		description: 'Пароль от аккаунта пользователя'
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	public password: string
}

export default RegisterRequest
