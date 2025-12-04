import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name)

	constructor(configService: ConfigService) {
		const databaseUrl = configService.get<string>('DATABASE_URL')

		if (!databaseUrl) {
			throw new Error('DATABASE_URL is missing in .env file')
		}

		const adapter = new PrismaPg({ connectionString: databaseUrl })

		super({
			adapter,
			log: ['query', 'info', 'warn', 'error']
		})
	}

	async onModuleInit() {
		this.logger.log('Connecting to database...')
		try {
			await this.$connect()
			this.logger.log('Database connected successfully')
		} catch (error) {
			this.logger.error('Database connection failed', error)
			throw error
		}
	}

	async onModuleDestroy() {
		this.logger.log('Disconnecting from database...')
		await this.$disconnect()
	}
}
