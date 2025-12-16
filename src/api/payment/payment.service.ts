import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { PrismaService } from '../../infra/prisma/prisma.service'

interface PaymentHistoryItem {
	id: string
	createdAt: Date
	plan: string
	amount: number
	provider: string
	status: string
}

@Injectable()
export class PaymentService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getHistory(user: User) {
		const payments = await this.prismaService.transaction.findMany({
			where: { userId: user.id },
			orderBy: { createdAt: 'desc' },
			include: {
				subscription: {
					include: { plan: true }
				}
			}
		})

		const formatted = payments.map(payment => ({
			id: payment.id,
			createdAt: payment.createdAt,
			plan: payment.subscription?.plan?.title ?? 'Без плана',
			amount: payment.amount,
			provider: payment.provider,
			status: payment.status
		}))

		return formatted
	}
}
