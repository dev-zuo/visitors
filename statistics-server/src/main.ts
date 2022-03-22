import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BaseService } from './base/base.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 上报 gif 拦截
  app.use(BaseService.gifReportHandler());
  // 开启静态服务
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(3000);
}

bootstrap();