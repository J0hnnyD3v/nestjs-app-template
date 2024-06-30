import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { validate } from './config/env/env.validations';
import { LoggerModule } from './core/logger/logger.module';
import { HealthModule } from './core/health/health.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService?.get<string>('DATABASE_HOST'),
        port: configService?.get<number>('DATABASE_PORT'),
        username: configService?.get<string>('DATABASE_USERNAME'),
        password: configService?.get<string>('DATABASE_PASSWORD'),
        database: configService?.get<string>('DATABASE_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
        synchronize: true,
        retryDelay: 5000,
      }),
    }),
    LoggerModule,
    HealthModule,
    ErrorHandlerModule,
    UserModule,
  ],
})
export class AppModule {}
