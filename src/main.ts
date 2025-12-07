import { Logger, ValidationPipe } from '@nestjs/common'
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
		throw new Error('COOKIES_SECRET is missing')
	}
	app.use(cookieParser(cookieSecret))

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	)

	app.enableCors(getCorsConfig(config))

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Payments API')
		.setDescription(
			'Платёжный бэкенд с JWT + refresh-токенами в httpOnly-куках'
		)
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				in: 'header'
			},
			'JWT-auth'
		)
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('docs', app, document, {
		swaggerOptions: {
			persistAuthorization: true
		}
	})

	const port = config.getOrThrow<number>('HTTP_PORT')

	await app.listen(port)

	logger.log(`Server running on http://localhost:${port}`)
	logger.log(`Swagger UI: http://localhost:${port}/docs`)
}

bootstrap()
