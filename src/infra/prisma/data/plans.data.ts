import { Plan } from '@prisma/client'

export const plans: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>[] = [
	{
		title: 'Базовый',
		description:
			'Подходит для малых проектов и индивидуальных предпринимателей.',
		features: [
			'3 проекта',
			'10 Гб хранилища',
			'Базовая поддержка',
			'Доступ к основным функциям'
		],
		isFeatured: false,
		monthlyPrices: 560,
		yearlyPrices: 7902
	},
	{
		title: 'Профессиональный',
		description: 'Подходит для развивающихся компаний и команд.',
		features: [
			'Неограниченное количество проектов',
			'100 Гб хранилища',
			'Приоритетная поддержка',
			'Продвинутая аналитика',
			'Функции для команд'
		],
		isFeatured: true,
		monthlyPrices: 2500,
		yearlyPrices: 25000
	},
	{
		title: 'Бизнес',
		description: 'Для крупных компаний с высокими требованиями.',
		features: [
			'Неограниченное количество проектов',
			'1 Тб хранилища',
			'Круглосуточная поддержка',
			'Безопасность',
			'Выделенный менеджер'
		],
		isFeatured: false,
		monthlyPrices: 4999,
		yearlyPrices: 49000
	}
]
