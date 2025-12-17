import { BillingPeriod, PaymentProvider } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class InitPaymentRequest {
	@IsString()
	@IsNotEmpty()
	public planId: string

	@IsEnum(BillingPeriod)
	public billingPeriod: BillingPeriod

	@IsEnum(PaymentProvider)
	public provider: PaymentProvider
}
