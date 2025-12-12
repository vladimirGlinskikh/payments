import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

import { plans } from './data'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
	throw new Error('DATABASE_URL is missing in .env')
}

const adapter = new PrismaPg({ connectionString })

const prisma = new PrismaClient({ adapter })

async function main() {
	try {
		console.log('Starting seed')
		await prisma.plan.deleteMany()
		await prisma.plan.createMany({
			data: plans
		})
		console.log('Seeding finished')
	} catch (error) {
		console.log(error)
		throw new Error('Failed to seed the database')
	}
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error('Seed failed:', e)
		await prisma.$disconnect()
		process.exit(1)
	})
