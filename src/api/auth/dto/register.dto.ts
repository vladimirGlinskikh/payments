import { IsEmail, IsString } from 'class-validator'

class RegisterDto {
	@IsString()
	public name: string
	@IsEmail()
	public email: string
	@IsString()
	public password: string
}

export default RegisterDto;
