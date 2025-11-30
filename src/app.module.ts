import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InfraModule } from './infra/infra.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		}),
		InfraModule
	]
})
export class AppModule {}
