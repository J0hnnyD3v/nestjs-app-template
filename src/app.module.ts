import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './config/env/env.validations';
import { LoggerModule } from './core/logger/logger.module';
import { HealthModule } from './core/health/health.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true, validate }), LoggerModule, HealthModule],
})
export class AppModule {}
