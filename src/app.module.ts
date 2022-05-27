import { HttpModule } from '@nestjs/axios';
import { ErrorService } from './error/error.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { DonationService } from './donations/donation.service';
import { DonationsController } from './donations/donations.controller';
import { FormatService } from './services/format.service';

@Module({
  imports: [AuthModule, UsersModule,
  SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'database-1.cfvt67mmq1qj.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'pameladeco',
      database: 'ingresso',
      models: [User],
    }), HttpModule.register({
      timeout: 50000,
      maxRedirects: 5
    })],
  controllers: [AppController, DonationsController],
  providers: [AppService, ErrorService, DonationService, FormatService,],
  exports:[ErrorService]
})
export class AppModule {}
