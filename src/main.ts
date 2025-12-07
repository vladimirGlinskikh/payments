import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { getCorsConfig } from './config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const logger = new Logger('Bootstrap')

	const cookieSecret = config.get<string>('COOKIES_SECRET')
	if (!cookieSecret) {
		throw new Error('COOKIES_SECRET is missing in .env')
	}
	app.use(cookieParser(cookieSecret))

	app.enableCors(getCorsConfig(config))

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Payments API')
		.setDescription(
			`
<div align="center" style="margin: 60px 0;">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS" />
  
  <h1 style="
    font-size: 7.5em;
    font-weight: 900;
    margin: 40px 0 20px 0;
    background: linear-gradient(90deg, #e0234e, #f97316, #10b981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
    letter-spacing: -2px;
  ">
    Платёжный бэкенд
  </h1>

  <p style="
    font-size: 1.8em;
    color: #ccc;
    margin: 40px 0;
    font-weight: 500;
  ">
    JWT + Refresh в httpOnly‑куках • Argon2 • Prisma 7 • Docker
  </p>
</div>

<div style="background: #111; padding: 30px; border-radius: 16px; margin: 30px 0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">
    <div style="background: #1e1e1e; padding: 20px; border-radius: 12px; text-align: center;">
      <h3 style="margin: 0 0 10px; color: #e0234e;">Аутентификация</h3>
      <p style="margin:0; color:#ccc">Регистрация • Логин • Refresh • Logout</p>
    </div>
    <div style="background: #1e1e1e; padding: 20px; border-radius: 12px; text-align: center;">
      <h3 style="margin: 0 0 10px; color: #10b981;">Безопасность</h3>
      <p style="margin:0; color:#ccc">httpOnly куки • Argon2 • JWT</p>
    </div>
    <div style="background: #1e1e1e; padding: 20px; border-radius: 12px; text-align: center;">
      <h3 style="margin: 0 0 10px; color: #3b82f6;">Документация</h3>
      <p style="margin:0; color:#ccc">OpenAPI 3.0 • Авторизация в 1 клик</p>
    </div>
  </div>
</div>
`
		)
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Введите JWT токен (полученный при логине)',
				in: 'header'
			},
			'JWT-auth'
		)
		.setLicense('MIT', 'https://opensource.org/licenses/MIT')
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('docs', app, document, {
		customCss: `
      .swagger-ui .topbar { background: #1a1a1a; }
      .swagger-ui .info { margin: 50px 0; text-align: center; }
      .swagger-ui .info h2 { color: #e0234e; }
      .swagger-ui .auth-wrapper { margin-top: 20px; }
    `,
		customSiteTitle: 'Payments API — Документация',
		swaggerOptions: {
			persistAuthorization: true,
			tagsSorter: 'alpha',
			operationsSorter: 'alpha'
		}
	})

	const port = config.getOrThrow<number>('HTTP_PORT', 4000)

	await app.listen(port)

	logger.log(`Server running on http://localhost:${port}`)
	logger.log(`Swagger UI → http://localhost:${port}/docs`)
}

bootstrap()
