import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { PlanModule } from './plan/plan.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [AuthModule, UsersModule, PlanModule]
})
export class ApiModule {}
