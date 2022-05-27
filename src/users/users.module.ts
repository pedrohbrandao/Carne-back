import { AuthModule } from '../auth/auth.module';
import { AuthService } from './../auth/auth.service';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [forwardRef(() => AuthModule),SequelizeModule.forFeature([User])],
  providers: [UsersService],
  exports : [UsersService, SequelizeModule],
  controllers: [UsersController]
})
export class UsersModule {}
