import { Injectable } from '@nestjs/common'
import { BillingPeriod, Plan, Transaction } from '@prisma/client'
import {
	ConfirmationEnum,
	CurrencyEnum,
	YookassaService
} from 'nestjs-yookassa'

@Injectable()
export class YoomoneyService {
	public constructor(private readonly yookassaService: YookassaService) {}

	public async create(
		plan: Plan,
		transaction: Transaction,
		billingPeriod: BillingPeriod
	) {
		const amount =
			billingPeriod === BillingPeriod.MONTHLY
				? plan.monthlyPrice
				: plan.yearlyPrice

		const payment = await this.yookassaService.payments.create({
			amount: {
				value: Number(amount.toFixed(2)),
				currency: CurrencyEnum.RUB
			},
			description: `Оплата подписки "${plan.title}" (${billingPeriod === BillingPeriod.MONTHLY ? 'ежемесячно' : 'ежегодно'})`,
			confirmation: {
				type: ConfirmationEnum.REDIRECT,
				return_url: 'https://ловизаказ.рф'
			},
			capture: true,
			save_payment_method: true,
			metadata: {
				transactionId: transaction.id,
				userId: transaction.userId,
				planId: plan.id
			}
		})
		return payment
	}
}
