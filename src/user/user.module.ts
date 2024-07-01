import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './services/user.service';
import { UserController } from './api/user.controller';
import { User } from './entities/user.entity';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User]), ErrorHandlerModule],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
