import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import type { User } from '@prisma/client'

import { Authorized, Protected } from '../../common/decorators'
import { JwtAuthGuard } from '../../common/guards'

import { InitPaymentRequest, PaymentHistoryResponse } from './dto'
import { PaymentService } from './payment.service'

@ApiTags('payment')
@Controller('payments')
export class PaymentController {
	public constructor(private readonly paymentService: PaymentService) {}

	@ApiOperation({
		summary: 'Получить историю платежей',
		description: 'Возвращает список всех транзакций пользователя'
	})
	@ApiOkResponse({
		type: [PaymentHistoryResponse]
	})
	@Protected()
	@Get()
	public async getHistory(@Authorized() user: User) {
		return await this.paymentService.getHistory(user)
	}

	@Protected()
	@Post()
	public async init(
		@Body() dto: InitPaymentRequest,
		@Authorized() user: User
	) {
		return await this.paymentService.init(dto, user)
	}
}
