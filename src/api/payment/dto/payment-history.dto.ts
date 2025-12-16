import { ApiProperty } from '@nestjs/swagger'
import { PaymentProvider, TransactionStatus } from '@prisma/client'

export class PaymentHistoryResponse {
	@ApiProperty({
		description: 'Уникальный идентификатор транзакции',
		example: 'slkjkDSsk-0'
	})
	public id: string

	@ApiProperty({
		description: 'Время создания транзакции',
		example: '2025-12-12 05:02:52.495'
	})
	public createdAt: Date

	@ApiProperty({
		description: 'Название плана подписки',
		example: 'Premium'
	})
	public plan: string

	@ApiProperty({
		description: 'Сумма сделки',
		example: 3479
	})
	public amount: number

	@ApiProperty({
		description: 'Поставщик платежных услуг',
		example: PaymentProvider.YOOKASSA,
		enum: PaymentProvider
	})
	public provider: PaymentProvider

	@ApiProperty({
		description: 'Статус транзакции',
		example: TransactionStatus.SUCCEEDED,
		enum: TransactionStatus
	})
	public status: TransactionStatus
}
