import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseController } from './base/base.controller'
import { BaseService } from './base/base.service';

@Module({
  imports: [],
  controllers: [AppController, BaseController],
  providers: [AppService, BaseService],
})

export class AppModule {}