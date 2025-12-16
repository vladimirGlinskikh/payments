import { ApiProperty } from '@nestjs/swagger'

export class PlanResponse {
	@ApiProperty({
		description: 'Уникальный идентификатор плана',
		example: '23kslkKhge34slkj'
	})
	public id: string

	@ApiProperty({
		description: 'Название плана подписки',
		example: 'Премиум'
	})
	public title: string

	@ApiProperty({
		description: 'Описание плана подписки',
		example: 'Полный доступ ко всем функциям платформы'
	})
	public description: string

	@ApiProperty({
		description: 'Список функций, включенных в план',
		example: [
			'Неограниченный доступ к контенту',
			'Приоритетная поддержка',
			'Расширенная аналитика'
		],
		isArray: true
	})
	public features: string

	@ApiProperty({
		description: 'Цена месячную подписку',
		example: 250
	})
	public monthlyPrice: number

	@ApiProperty({
		description: 'Цена подписки за год',
		example: 2500
	})
	public yearlyPrice: number

	@ApiProperty({
		description: 'Указывает, представлен ли план или рекламируется',
		example: true
	})
	public isFeatured: boolean
}
