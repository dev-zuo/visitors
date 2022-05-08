import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseService } from './base.service';
import { BaseController } from './base.controller';
import { Base } from './base.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Base]), HttpModule],
  providers: [BaseService],
  controllers: [BaseController],
})
export class BaseModule {}
