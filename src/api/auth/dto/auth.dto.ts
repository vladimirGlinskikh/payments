import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
	@ApiProperty({
		example: 'askjhfjjigkKGHKjdjswh138akj',
		description: 'Токен доступа пользователя для авторизации'
	})
	public accessToken: string
}
