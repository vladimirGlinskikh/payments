import { Injectable, NotFoundException } from '@nestjs/common'
import { BillingPeriod, PaymentProvider, User } from '@prisma/client'

import { PrismaService } from '../../infra/prisma/prisma.service'

import { InitPaymentRequest } from './dto/init-payment.dto'
import { YoomoneyService } from './providers/yoomoney/yoomoney.service'

@Injectable()
export class PaymentService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly yoomoneyService: YoomoneyService
	) {}

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

	public async init(dto: InitPaymentRequest, user: User) {
		const { planId, billingPeriod, provider } = dto

		const plan = await this.prismaService.plan.findUnique({
			where: { id: planId }
		})

		if (!plan) throw new NotFoundException('Plan not found')

		const amount =
			billingPeriod === 'YEARLY' ? plan.yearlyPrice : plan.monthlyPrice

		let subscription = await this.prismaService.userSubscription.findUnique(
			{
				where: { userId: user.id }
			}
		)

		if (subscription) {
			subscription = await this.prismaService.userSubscription.update({
				where: { id: subscription.id },
				data: {
					plan: { connect: { id: planId } },
					status: 'PENDING_PAYMENT',
					startDate: new Date(),
					endDate: null
				}
			})
		} else {
			subscription = await this.prismaService.userSubscription.create({
				data: {
					user: { connect: { id: user.id } },
					plan: { connect: { id: planId } },
					status: 'PENDING_PAYMENT',
					startDate: new Date()
				}
			})
		}

		const transaction = await this.prismaService.transaction.create({
			data: {
				amount,
				provider,
				billingPeriod: billingPeriod.toUpperCase() as BillingPeriod,
				status: 'PENDING',
				providerMeta: {},
				user: { connect: { id: user.id } },
				subscription: {
					connectOrCreate: {
						where: {
							userId: user.id
						},
						create: {
							user: {
								connect: {
									id: user.id
								}
							},
							plan: {
								connect: {
									id: plan.id
								}
							}
						}
					}
				}
			}
		})

		let payment

		switch (provider) {
			case PaymentProvider.YOOKASSA:
				payment = await this.yoomoneyService.create(
					plan,
					transaction,
					billingPeriod
				)
		}

		await this.prismaService.transaction.update({
			where: {
				id: transaction.id
			},
			data: {
				providerMeta: payment
			}
		})

		return payment
	}
}
