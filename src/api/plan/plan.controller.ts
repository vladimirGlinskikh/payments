import { Controller, Get, Param } from '@nestjs/common'
import {
	ApiNotFoundResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'

import { PlanResponse } from './dto'
import { PlanService } from './plan.service'

@ApiTags('plans')
@Controller('plans')
export class PlanController {
	constructor(private readonly planService: PlanService) {}

	@Get()
	@ApiOperation({
		summary: 'Получить все тарифные планы',
		description: 'Возвращает список всех доступных тарифных планов'
	})
	@ApiResponse({
		status: 200,
		description: 'Список тарифных планов успешно получен',
		type: [PlanResponse],
		example: [
			{
				id: 'plan_abc123',
				title: 'Начальный',
				description: 'Базовый тариф',
				features: ['10 проектов', '100 ГБ хранилища'],
				monthlyPrice: 990,
				yearlyPrice: 9900,
				createdAt: '2025-12-08T10:00:00.000Z',
				updatedAt: '2025-12-08T10:00:00.000Z'
			}
		]
	})
	public async getAll() {
		return this.planService.getAll()
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Получить план по ID',
		description: 'Возвращает один тарифный план по его идентификатору'
	})
	@ApiParam({
		name: 'id',
		description: 'Уникальный ID плана',
		example: 'plan_abc123'
	})
	@ApiResponse({
		status: 200,
		description: 'План найден',
		type: [PlanResponse],
		example: {
			id: 'plan_abc123',
			title: 'Pro',
			description: 'Профессиональный тариф',
			features: ['Безлимит', 'Приоритетная поддержка'],
			monthlyPrice: 2990,
			yearlyPrice: 29900,
			createdAt: '2025-12-08T10:00:00.000Z',
			updatedAt: '2025-12-08T10:00:00.000Z'
		}
	})
	@ApiNotFoundResponse({
		description: 'План не найден',
		example: {
			statusCode: 404,
			message: 'Plan not found'
		}
	})
	public async getById(@Param('id') id: string) {
		return this.planService.getById(id)
	}
}
