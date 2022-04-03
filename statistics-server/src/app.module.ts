import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseController } from './base/base.controller';
import { BaseService } from './base/base.service';

import { TypeOrmModule } from '@nestjs/typeorm';
// import { Base } from './base/base.entity'
import { BaseModule } from './base/base.module';
// import { Connection } from 'typeorm';
import { PASSWORD } from './config/password';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: PASSWORD,
      database: 'zuo_statistics',
      // entities: [Base],
      autoLoadEntities: true,
      synchronize: false, // 会直接将数据库表结构修改
    }),
    BaseModule,
  ],
  // 会导致数据库链接不上
  // controllers: [AppController, BaseController],
  // providers: [AppService, BaseService],
})
export class AppModule {
  //  constructor(private readonly connection: Connection) {}
}
