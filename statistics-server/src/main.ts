import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BaseService } from './base/base.service';
import * as express from 'express'
import { Base } from './base/base.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import  * as  log4js from 'log4js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // access log
  app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
  // 上报 gif 拦截
  app.use(BaseService.gifReportHandler());
  // 支持 navigator beacon api post raw text parse
  app.use(express.text()); 
  // 开启静态服务
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(3000);
}

bootstrap();