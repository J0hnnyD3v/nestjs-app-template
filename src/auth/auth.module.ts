import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';
import { UserModule } from 'src/user/user.module';

import { AuthController } from './api/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    /* this is an async module */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
    ErrorHandlerModule,
    forwardRef(() => UserModule),
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
